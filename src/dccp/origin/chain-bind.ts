/** The named protocols sit beside each other. They are not one binding.
 * A missing protocol is not invented to finish the chain.
 */

export function protocolChain(): {
  bound: false
  unity: 'W3C WebAuthn / FIDO2'
  api: 'DCLM-MACHINE/2'
  website: 'this page'
  dataCenter: null
  ledger: 'this device'
  coins: 'test unit'
  entirety: null
} {
  return {
    bound: false,
    unity: 'W3C WebAuthn / FIDO2',
    api: 'DCLM-MACHINE/2',
    website: 'this page',
    dataCenter: null,
    ledger: 'this device',
    coins: 'test unit',
    entirety: null,
  }
}

export function executeChain(): { ran: string[]; stopped: 'data-center'; operator: null; address: null; text: null } {
  return { ran: ['unity', 'api', 'website'], stopped: 'data-center', operator: null, address: null, text: null }
}

export function executeWords(): string {
  const run = executeChain()
  return `The chain is connected to the brain, and the brain speaks the stop. It ran through ${run.ran.join(', ')}, then stopped at the data center. A real data center needs an operator, an address, and a protocol text. None of those is held, so nothing was contacted and nothing was built in its place. The ledger, the coins, and the entirety were not reached. The jacket stayed closed.`
}

export function chainBindWords(): string {
  const row = protocolChain()
  return `Not bound. The Unity ID is ${row.unity}, and it titles a seat. The API is ${row.api}, declared and not verified, and the jacket is closed. The website is ${row.website}. A data-center protocol is not held. The ledger is ${row.ledger}, and it is not joined to the API. The coins are a ${row.coins}, and the till is closed. The entirety of everything is not a protocol. A missing link was not filled in.`
}
