/** RTE-Nutrition. A diary in the shape of a calorie tracker.
 * Figures are rounded typical servings from USDA FoodData Central, not a look at the plate.
 * The log stays on this device. Nothing here is medical advice.
 */

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Food {
  id: string
  name: string
  serving: string
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export interface Bite {
  id: string
  foodId: string
  name: string
  serving: string
  meal: Meal
  servings: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  at: string
}

export interface Macros {
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export interface Diary {
  goal: number
  bites: Bite[]
  customs: Food[]
}

/** Rounded typical servings. Source: USDA FoodData Central. Not a prescription and not a weighed plate. */
export const FOODS: readonly Food[] = [
  { id: 'apple', name: 'Apple', serving: '1 medium', kcal: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 'banana', name: 'Banana', serving: '1 medium', kcal: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 'orange', name: 'Orange', serving: '1 medium', kcal: 62, protein: 1.2, carbs: 15, fat: 0.2 },
  { id: 'egg', name: 'Egg', serving: '1 large', kcal: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { id: 'oats', name: 'Oats, dry', serving: '40 g', kcal: 152, protein: 5.3, carbs: 27, fat: 2.7 },
  { id: 'milk', name: 'Milk, whole', serving: '1 cup', kcal: 149, protein: 8, carbs: 12, fat: 8 },
  { id: 'yogurt', name: 'Yogurt, plain low-fat', serving: '170 g', kcal: 107, protein: 8.9, carbs: 12, fat: 2.6 },
  { id: 'bread', name: 'Bread, white', serving: '1 slice', kcal: 79, protein: 2.7, carbs: 15, fat: 1 },
  { id: 'rice', name: 'Rice, white, cooked', serving: '1 cup', kcal: 206, protein: 4.3, carbs: 45, fat: 0.4 },
  { id: 'pasta', name: 'Pasta, cooked', serving: '1 cup', kcal: 221, protein: 8.1, carbs: 43, fat: 1.3 },
  { id: 'potato', name: 'Potato, baked', serving: '1 medium', kcal: 161, protein: 4.3, carbs: 37, fat: 0.2 },
  { id: 'chicken', name: 'Chicken breast, cooked', serving: '100 g', kcal: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'salmon', name: 'Salmon, cooked', serving: '100 g', kcal: 206, protein: 22, carbs: 0, fat: 12 },
  { id: 'beans', name: 'Black beans, cooked', serving: '1 cup', kcal: 227, protein: 15, carbs: 41, fat: 0.9 },
  { id: 'broccoli', name: 'Broccoli, cooked', serving: '1 cup', kcal: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { id: 'cheddar', name: 'Cheddar', serving: '28 g', kcal: 114, protein: 7, carbs: 0.4, fat: 9.4 },
  { id: 'peanut', name: 'Peanut butter', serving: '2 tbsp', kcal: 188, protein: 8, carbs: 6, fat: 16 },
  { id: 'almonds', name: 'Almonds', serving: '28 g', kcal: 164, protein: 6, carbs: 6, fat: 14 },
  { id: 'oil', name: 'Olive oil', serving: '1 tbsp', kcal: 119, protein: 0, carbs: 0, fat: 13.5 },
  { id: 'coffee', name: 'Coffee, black', serving: '1 cup', kcal: 2, protein: 0.3, carbs: 0, fat: 0 },
]

export const MEALS: readonly Meal[] = ['breakfast', 'lunch', 'dinner', 'snack']
export const LABEL_KCAL = 2000
export const LABEL_PROTEIN = 50
export const LABEL_CARBS = 275
export const LABEL_FAT = 78
const KEY = 'dccpworld.nutrition.v1'

const empty = (): Diary => ({ goal: LABEL_KCAL, bites: [], customs: [] })

export function todayKey(now = new Date()): string {
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${m}-${d}`
}

export function dayOf(iso: string): string {
  return iso.slice(0, 10)
}

function finite(n: unknown, fallback = 0): number {
  const v = typeof n === 'number' ? n : Number(n)
  return Number.isFinite(v) ? v : fallback
}

export function loadDiary(raw: string | null = null): Diary {
  const text = raw ?? (typeof localStorage === 'undefined' ? null : localStorage.getItem(KEY))
  if (!text) return empty()
  try {
    const parsed = JSON.parse(text) as Partial<Diary>
    const goal = finite(parsed.goal, LABEL_KCAL)
    return {
      goal: Math.min(20000, Math.max(1, goal)),
      bites: Array.isArray(parsed.bites) ? parsed.bites.filter(row => row && typeof row.id === 'string' && typeof row.name === 'string') : [],
      customs: Array.isArray(parsed.customs) ? parsed.customs.filter(row => row && typeof row.id === 'string') : [],
    }
  } catch {
    return empty()
  }
}

export function saveDiary(diary: Diary): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(diary))
}

export function indexOf(diary: Diary): Food[] {
  return [...FOODS, ...diary.customs]
}

export function searchFoods(diary: Diary, query: string): Food[] {
  const q = query.trim().toLowerCase()
  const all = indexOf(diary)
  if (!q) return all.slice(0, 8)
  return all.filter(food => food.name.toLowerCase().includes(q)).slice(0, 8)
}

export function totals(bites: Bite[]): Macros {
  return bites.reduce<Macros>((sum, bite) => ({
    kcal: sum.kcal + bite.kcal,
    protein: sum.protein + bite.protein,
    carbs: sum.carbs + bite.carbs,
    fat: sum.fat + bite.fat,
  }), { kcal: 0, protein: 0, carbs: 0, fat: 0 })
}

export function scale(food: Food, servings: number): Macros {
  const n = Number.isFinite(servings) && servings > 0 ? servings : 1
  return {
    kcal: food.kcal * n,
    protein: food.protein * n,
    carbs: food.carbs * n,
    fat: food.fat * n,
  }
}

export function addBite(diary: Diary, food: Food, meal: Meal, servings: number, at = new Date().toISOString()): Diary {
  const n = Number.isFinite(servings) && servings > 0 ? Math.min(servings, 20) : 1
  const macros = scale(food, n)
  const bite: Bite = {
    id: `${at}:${food.id}:${diary.bites.length}`,
    foodId: food.id,
    name: food.name,
    serving: food.serving,
    meal,
    servings: n,
    ...macros,
    at,
  }
  return { ...diary, bites: [...diary.bites, bite] }
}

export function addCustom(diary: Diary, name: string, kcal: number, meal: Meal, at = new Date().toISOString()): Diary | null {
  const title = name.trim()
  const energy = finite(kcal, NaN)
  if (!title || !Number.isFinite(energy) || energy < 0 || energy > 5000) return null
  const food: Food = { id: `custom:${title.toLowerCase()}`, name: title, serving: 'the amount you entered', kcal: energy, protein: 0, carbs: 0, fat: 0 }
  const customs = diary.customs.some(row => row.id === food.id) ? diary.customs : [...diary.customs, food]
  return addBite({ ...diary, customs }, food, meal, 1, at)
}

export function removeBite(diary: Diary, id: string): Diary {
  return { ...diary, bites: diary.bites.filter(bite => bite.id !== id) }
}

export function setGoal(diary: Diary, goal: number): Diary {
  const n = finite(goal, diary.goal)
  return { ...diary, goal: Math.min(20000, Math.max(1, n)) }
}

export interface DayView {
  day: string
  goal: number
  query: string
  meal: Meal
  eaten: Macros
  left: number
  over: number
  hits: Food[]
  byMeal: Record<Meal, Bite[]>
  week: { day: string; kcal: number }[]
}

export function dayView(diary: Diary, day: string, query: string, meal: Meal): DayView {
  const todays = diary.bites.filter(bite => dayOf(bite.at) === day)
  const eaten = totals(todays)
  const byMeal = Object.fromEntries(MEALS.map(name => [name, todays.filter(bite => bite.meal === name)])) as Record<Meal, Bite[]>
  const week: { day: string; kcal: number }[] = []
  const start = new Date(`${day}T12:00:00`)
  for (let i = 6; i >= 0; i--) {
    const when = new Date(start)
    when.setDate(start.getDate() - i)
    const key = todayKey(when)
    week.push({ day: key, kcal: totals(diary.bites.filter(bite => dayOf(bite.at) === key)).kcal })
  }
  return {
    day,
    goal: diary.goal,
    query,
    meal,
    eaten,
    left: Math.max(0, diary.goal - eaten.kcal),
    over: Math.max(0, eaten.kcal - diary.goal),
    hits: searchFoods(diary, query),
    byMeal,
    week,
  }
}

export function nutritionSpeech(diary: Diary, day = todayKey()): string {
  const view = dayView(diary, day, '', 'breakfast')
  const logged = view.eaten.kcal === 0
    ? 'Nothing is logged today.'
    : `Today is ${Math.round(view.eaten.kcal)} kcal logged, ${Math.round(view.eaten.protein)} g protein.`
  return `${logged} The index holds ${indexOf(diary).length} foods, rounded from USDA FoodData Central. A name you say or type can match one. The camera cannot name a plate. It stays on only while this room is open and you leave it granted. A browser cannot watch the kitchen after you leave. 2,000 kcal is the figure on US labels, not a plan for you.`
}

const esc = (s: string): string => s.replace(/[&<>"]/g, c => (c === '&' ? '\u0026amp;' : c === '<' ? '\u0026lt;' : c === '>' ? '\u0026gt;' : '\u0026quot;'))
const n1 = (n: number): string => (Math.round(n * 10) / 10).toString()

export function renderNutrition(view: DayView): string {
  const p = view.goal > 0 ? Math.min(1, view.eaten.kcal / view.goal) : 0
  const ring = view.over > 0 ? `${Math.round(view.over)} over` : `${Math.round(view.left)} left`
  const macro = (label: string, grams: number, ref: number) => {
    const width = Math.min(100, Math.round((grams / ref) * 100))
    return `<div><b>${label}</b><span>${n1(grams)} g</span><i style="width:${width}%"></i></div>`
  }
  const hits = view.hits.length
    ? view.hits.map(food => `<li><button type="button" data-nut="add" data-id="${esc(food.id)}"><strong>${esc(food.name)}</strong><small>${esc(food.serving)} · ${food.kcal} kcal</small></button></li>`).join('')
    : `<li class="nut-miss"><p>Not in the index. Nothing was invented.</p><input class="nut-custom-kcal" inputmode="numeric" placeholder="kcal you count" aria-label="Calories for this food"><button type="button" data-nut="custom">Keep ${esc(view.query.trim() || 'it')} with that number</button></li>`
  const mealBlock = MEALS.map(meal => {
    const rows = view.byMeal[meal]
    const body = rows.length
      ? rows.map(bite => `<li><span>${esc(bite.name)} · ${n1(bite.servings)} × ${esc(bite.serving)} · ${Math.round(bite.kcal)} kcal</span><button type="button" data-nut="drop" data-id="${esc(bite.id)}" aria-label="Remove ${esc(bite.name)}">×</button></li>`).join('')
      : '<li class="nut-empty">Nothing here.</li>'
    return `<section><h3>${meal}</h3><ul>${body}</ul></section>`
  }).join('')
  const week = view.week.map(row => {
    const width = view.goal > 0 ? Math.min(100, Math.round((row.kcal / view.goal) * 100)) : 0
    const label = row.day.slice(5)
    return `<div><span>${label}</span><i style="width:${width}%"></i><b>${Math.round(row.kcal)}</b></div>`
  }).join('')
  return `<div class="nut-top"><div class="nut-ring" style="--p:${p.toFixed(3)}" role="img" aria-label="${Math.round(view.eaten.kcal)} of ${Math.round(view.goal)} kcal"><span><strong>${ring}</strong><small>${Math.round(view.eaten.kcal)} / ${Math.round(view.goal)}</small></span></div><div class="nut-macros">${macro('Protein', view.eaten.protein, LABEL_PROTEIN)}${macro('Carbs', view.eaten.carbs, LABEL_CARBS)}${macro('Fat', view.eaten.fat, LABEL_FAT)}</div></div><p class="nut-note">The ring uses your goal. The bars use the US label daily values, 50 g protein, 275 g carbohydrate, 78 g fat. Not a plan for you. Source: USDA FoodData Central, rounded.</p><ul class="nut-hits">${hits}</ul><h3 class="nut-h">Today · ${esc(view.day)}</h3>${mealBlock}<h3 class="nut-h">Seven days</h3><div class="nut-week">${week}</div>`
}
