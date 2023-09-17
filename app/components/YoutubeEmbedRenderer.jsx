import React, { useState } from 'react'

export default function YoutubeEmbedRenderer(props) {
    const [embedState, setEmbedState] = useState(false)
    const vidId = getId(props.link)

  function getId(link) {
    if (link.startsWith('https://www.youtube.com')) {
      return link.split('=')[1]
    }

    else if (link.startsWith('https://youtu.be/')) {
      return link.split('?').join('/').split('/')[3]
    }
  }

  function goToYoutube(link) {
    window.open(link, '_blank');
  }

  return (
    <div className='text-link cursor-pointer underline' key={`link-${props.index}`}>
        {!embedState && 
            <div className='flex gap-1.5'>
              <p onClick={() => goToYoutube(props.link)}>{props.link}</p>
              <span onClick={() => setEmbedState(!embedState)}>{' (open embed)'}</span>
            </div>
        }
        {embedState &&
            <>
              <div className='flex gap-1.5'>
                <p onClick={() => goToYoutube(props.link)}>{props.link}</p>
                <span onClick={() => setEmbedState(!embedState)}>{' (close embed)'}</span>
              </div>

              <iframe className='w-full' width="420" height="315"
                src={`https://www.youtube.com/embed/${vidId}`} allowFullScreen>
              </iframe>
            </>
        }
    </div>
  )
}
