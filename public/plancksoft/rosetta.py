"""ROSETTA — transitional abstract layer. Parse any, emit any. Pure.

IR: three-address code. Each op: (op, dst, a, b).
ops: param | const | add | sub | mul | mov | print | ret
One function per program. Params are inputs, ret is output.
"""
import ast, re, subprocess, tempfile, os, sys
sys.path.insert(0, "/home/hatch/workspace/plancksoft")
from pipeline import enc, dec, OP, Core

BOP = {"Add": "add", "Sub": "sub", "Mult": "mul"}
JSOP = {"+": "add", "-": "sub", "*": "mul"}
SYM = {"add": "+", "sub": "-", "mul": "*"}
ISA2IR = {v: k.lower() for k, v in OP.items() if k in ("ADD", "SUB", "MUL")}

_n = 0
def tmp():
    global _n; _n += 1; return f"t{_n}"

# ============ PARSERS: language -> IR ============

def _pe(e, ir):
    if isinstance(e, ast.Constant):
        v = tmp(); ir.append(("const", v, e.value, None)); return v
    if isinstance(e, ast.Name): return e.id
    if isinstance(e, ast.BinOp) and type(e.op).__name__ in BOP:
        a, b = _pe(e.left, ir), _pe(e.right, ir)
        v = tmp(); ir.append((BOP[type(e.op).__name__], v, a, b)); return v
    raise ValueError(f"py expr: {ast.dump(e)[:60]}")

def _ps(s, ir):
    if isinstance(s, ast.FunctionDef):
        for a in s.args.args: ir.append(("param", a.arg, None, None))
        for x in s.body: _ps(x, ir)
    elif isinstance(s, ast.Assign):
        ir.append(("mov", s.targets[0].id, _pe(s.value, ir), None))
    elif isinstance(s, ast.Return):
        ir.append(("ret", _pe(s.value, ir), None, None))
    elif isinstance(s, ast.Expr):
        ir.append(("print", None, _pe(s.value.args[0], ir), None))
    else: raise ValueError(f"py stmt: {ast.dump(s)[:60]}")

def from_python(src):
    ir = []
    for node in ast.parse(src).body: _ps(node, ir)
    return ir

def _je(e, ir):
    e = e.strip()
    m = re.fullmatch(r"-?\d+", e)
    if m: v = tmp(); ir.append(("const", v, int(e), None)); return v
    m = re.fullmatch(r"[A-Za-z_]\w*", e)
    if m: return e
    m = re.fullmatch(r"(.+?)\s*([+\-*])\s*(.+)", e)
    if m:
        a, b = _je(m.group(1), ir), _je(m.group(3), ir)
        v = tmp(); ir.append((JSOP[m.group(2)], v, a, b)); return v
    raise ValueError(f"js expr: {e[:60]}")

def from_js(src):
    ir = []
    m = re.search(r"function\s*\w*\s*\(([^)]*)\)\s*\{(.*)\}", src, re.S)
    body = m.group(2) if m else src
    if m:
        for p in m.group(1).split(","):
            if p.strip(): ir.append(("param", p.strip(), None, None))
    for st in re.split(r";", body):
        st = st.strip().strip("{}").strip()
        if not st: continue
        ma = re.fullmatch(r"(?:let|const|var)\s+([A-Za-z_]\w*)\s*=\s*(.+)", st)
        mb = re.fullmatch(r"([A-Za-z_]\w*)\s*=\s*(.+)", st)
        mr = re.fullmatch(r"return\s+(.+)", st)
        mp = re.fullmatch(r"console\.log\((.+)\)", st)
        if ma or mb:
            g = ma or mb; ir.append(("mov", g.group(1), _je(g.group(2), ir), None))
        elif mr: ir.append(("ret", _je(mr.group(1), ir), None, None))
        elif mp: ir.append(("print", None, _je(mp.group(1), ir), None))
        else: raise ValueError(f"js stmt: {st[:60]}")
    return ir

def from_isa(words, params=("r1", "r2")):
    ir = [("param", p, None, None) for p in params]
    out = None
    for w in words:
        d = dec(w); name = ISA2IR.get(d["op"])
        if name is None:
            if d["op"] == OP["NOP"]: continue
            raise ValueError(f"isa op: {d['op']}")
        dst = f"r{d['rd']}"
        ir.append((name, dst, f"r{d['rs']}", f"r{d['rt']}")); out = dst
    if out: ir.append(("ret", out, None, None))
    return ir

# ============ EMITTERS: IR -> language ============

def _params(ir): return [i[1] for i in ir if i[0] == "param"]

def to_python(ir):
    p = _params(ir); L = [f"def f({', '.join(p)}):"]
    for op, d, a, b in ir:
        if op == "const": L.append(f"    {d} = {a}")
        elif op in SYM: L.append(f"    {d} = {a} {SYM[op]} {b}")
        elif op == "mov": L.append(f"    {d} = {a}")
        elif op == "print": L.append(f"    print({a})")
        elif op == "ret": L.append(f"    return {d}")
    return "\n".join(L)

def to_js(ir):
    p = _params(ir); L = [f"function f({', '.join(p)}) {{"]
    for op, d, a, b in ir:
        if op == "const": L.append(f"    let {d} = {a};")
        elif op in SYM: L.append(f"    let {d} = {a} {SYM[op]} {b};")
        elif op == "mov": L.append(f"    let {d} = {a};")
        elif op == "print": L.append(f"    console.log({a});")
        elif op == "ret": L.append(f"    return {d};")
    return "\n".join(L + ["}"])

def to_isa(ir):
    """r0 hardwired zero by convention (emitter never allocates it).
    consts become harness-initialized regs (ISA has no immediates)."""
    reg, nxt, init = {}, [10], {}
    def R(v):
        if v not in reg: reg[v] = nxt[0]; nxt[0] += 1
        return reg[v]
    pn = 1
    for op, d, a, b in ir:
        if op == "param": reg[d] = pn; pn += 1
    words, out = [], None
    for op, d, a, b in ir:
        if op == "const": init[R(d)] = a
        elif op in SYM:
            words.append(enc(op.upper(), R(a), R(b), R(d))); out = R(d)
        elif op == "mov":
            words.append(enc("ADD", R(a), 0, R(d))); out = R(d)
        elif op == "print": raise ValueError("isa: print unsupported")
    return words, init, out

# ============ RUNNERS: execute ============

def run_py(src, args, ir):
    ns = {}; exec(src, ns)
    f = next(v for v in ns.values() if callable(v))
    return f(*args)

def run_js(src, args, ir):
    name = re.search(r"function\s+(\w+)", src)
    name = name.group(1) if name else "f"
    call = f"\nconsole.log({name}({', '.join(map(str, args))}));"
    fd, p = tempfile.mkstemp(suffix=".js"); os.write(fd, (src + call).encode()); os.close(fd)
    try:
        r = subprocess.run(["node", p], capture_output=True, text=True, timeout=10)
        assert r.returncode == 0, r.stderr[:200]
        return int(r.stdout.strip().splitlines()[-1])
    finally: os.unlink(p)

def run_isa(art, args, ir):
    words, init, out = art
    c = Core(); c.load(words)
    for i, v in enumerate(args): c.phys[c.map[i + 1]] = v & 0xFFFFFFFF
    for r, v in init.items(): c.phys[c.map[r]] = v & 0xFFFFFFFF
    c.run(12 + 2 * len(words))
    return c.phys[c.map[out]]

PARSERS = {"py": from_python, "js": from_js, "isa": lambda s: from_isa(*s)}
EMITTERS = {"py": to_python, "js": to_js, "isa": to_isa}
RUNNERS = {"py": run_py, "js": run_js, "isa": run_isa}

# ============ VALIDATE: semantics preserved? ============

def _isa_art(src, ir):
    words, _ = src
    out = int(next(i[1] for i in ir if i[0] == "ret")[1:])
    return words, {}, out

def check(src, fa, ta, args, **kw):
    """fa -> IR -> ta. Run both with args. Returns (ok, out_a, out_b)."""
    ir = PARSERS[fa](src, **kw) if fa == "isa" else PARSERS[fa](src)
    sa = src if fa != "isa" else _isa_art(src, ir)
    oa = RUNNERS[fa](sa, args, ir)
    ob = RUNNERS[ta](EMITTERS[ta](ir), args, ir)
    return oa == ob, oa, ob

# ============ BENCHMARK ============
if __name__ == "__main__":
    py = "def add(a, b):\n    return a + b"
    js = "function add(a, b) {\n    return a + b;\n}"
    isa_words = [enc("ADD", 1, 2, 3)]
    results = []
    for fa, src, kw in [("py", py, {}), ("js", js, {}), ("isa", (isa_words, ("r1", "r2")), {})]:
        for ta in ("py", "js", "isa"):
            if fa == ta: continue
            ok, oa, ob = check(src, fa, ta, (3, 4), **kw)
            results.append((fa, ta, ok, oa, ob))
            print(f"{fa} -> {ta}: {'PASS' if ok else 'FAIL'} ({oa} vs {ob})")
    assert all(r[2] for r in results), "translation broke semantics"
    # const materialization through isa
    ok, oa, ob = check("def f(a):\n    return a * 3 + 1", "py", "isa", (5,))
    print(f"py -> isa (consts): {'PASS' if ok else 'FAIL'} ({oa} vs {ob})")
    assert ok and oa == 16
    print(f"ROSETTA PURE. {len(results) + 1} translations, all semantics preserved. "
          f"{len(open(__file__).read().splitlines())} lines.")
