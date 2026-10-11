/** The same welcome for every watcher. It is not stored as seen. */

export const SPLASH = [
  'Welcome to the Unity playground. A better tomorrow for everyone. Truth prevails.',
  'Philosophically, truth prevails. No force. You may say what you say. What is answered is the claim.',
  'Mathematically, one plus one is two. One decision plus one choice is two options. Three purity rings. The keys are what they open. Both sides give and both sides receive, or it is not a structure.',
  'Legally, this room holds nothing. Joining costs nothing. The till is closed. There is no employee and no chief executive inside the playground. The rings and the keys are the structure. A title outside this room is not rewritten here, and a title does not open a child\'s record.',
  'Welcome. Truth prevails.',
].join(' ')

/** Who is watching does not change the record. */
export function welcomeFor(): string {
  return SPLASH
}

export function mountSplash(host: HTMLElement, reduced: boolean, place: (video: HTMLVideoElement) => () => void): void {
  const video = document.createElement('video')
  video.src = '/splash.mp4'
  video.playsInline = true
  video.loop = true
  video.muted = reduced
  video.preload = 'auto'
  video.setAttribute('aria-label', welcomeFor())
  video.style.cssText = 'position:fixed;width:2px;height:2px;opacity:0;pointer-events:none'
  host.appendChild(video)
  const drop = place(video)
  const chip = document.createElement('div')
  chip.className = 'splash-chip depth-near'
  chip.innerHTML = '<button type="button" data-splash="play">Play the welcome</button><button type="button" data-splash="skip">Skip</button>'
  host.appendChild(chip)
  const play = chip.querySelector<HTMLButtonElement>('[data-splash="play"]')!
  const finish = (): void => {
    video.pause()
    drop()
    video.remove()
    chip.remove()
  }
  chip.querySelector('[data-splash="skip"]')!.addEventListener('click', finish)
  const start = (): void => {
    play.hidden = true
    void video.play().then(() => { /* the picture is on the hologram */ }).catch(() => { play.hidden = false })
  }
  play.addEventListener('click', start)
  if (!reduced) start()
}
