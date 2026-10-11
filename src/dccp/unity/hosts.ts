/** This page is the app. There is no second file for any of these. */

export interface Host {
  os: string
  kernel: string
  how: string
}

export const HOSTS: readonly Host[] = [
  { os: 'Android', kernel: 'Linux', how: 'Install this page from the browser menu.' },
  { os: 'iPhone', kernel: 'XNU', how: 'Add this page from Share to the Home Screen.' },
  { os: 'iPad', kernel: 'XNU', how: 'Add this page from Share to the Home Screen.' },
  { os: 'Windows', kernel: 'NT', how: 'Install this page from the browser menu.' },
  { os: 'macOS', kernel: 'XNU', how: 'Install this page from the browser menu.' },
  { os: 'Linux', kernel: 'Linux', how: 'Install this page from the browser menu.' },
  { os: 'ChromeOS', kernel: 'Linux', how: 'Install this page from the browser menu.' },
]

const HERE: Host = { os: 'This browser', kernel: 'the one under it', how: 'This page is the app. There is no second file.' }

export function hostFor(ua: string): Host {
  const s = ua.toLowerCase()
  if (s.includes('android')) return HOSTS[0]
  if (s.includes('iphone') || s.includes('ipod')) return HOSTS[1]
  if (s.includes('ipad') || (s.includes('macintosh') && s.includes('mobile'))) return HOSTS[2]
  if (s.includes('cros')) return HOSTS[6]
  if (s.includes('windows')) return HOSTS[3]
  if (s.includes('mac os') || s.includes('macintosh')) return HOSTS[4]
  if (s.includes('linux')) return HOSTS[5]
  return HERE
}
