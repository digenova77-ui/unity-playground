import { useState } from 'react'
import { listenOnce, spokenTurn } from '@/dccp/iris/dictate'

function goSpoken(text: string): void {
  const turn = spokenTurn(text)
  if (turn.kind === 'page') location.assign(turn.href)
  else if (turn.kind === 'nav' && turn.id === 'home') location.assign('/')
}

/** One tap. Say where to go. The links stay, for a browser that cannot hear. */
export function SpeakPage() {
  const [note, setNote] = useState('')
  return (
    <p>
      <button
        type="button"
        className="story-enter"
        onClick={() => {
          setNote('Listening.')
          listenOnce(text => {
            setNote(text || 'Nothing was heard.')
            goSpoken(text)
          }, setNote)
        }}
      >
        Speak
      </button>
      {note ? <span className="story-source"> {note}</span> : null}
    </p>
  )
}
