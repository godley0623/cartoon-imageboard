import React, { useState } from 'react'

export default function YoutubeEmbedRenderer(props) {
    const [embedState, setEmbedState] = useState(false)
    const vidId = getId(props.link)

  function getId(link) {
    if (link.includes('watch?v=')) {
      return link.split('=')[1]
    }

    else if (link.includes('youtu.be/')) {
      return link.split('?').join('/').split('/')[3]
    }
  }

  function goToYoutube(link) {
    window.open(link, '_blank');
  }

  return (
    <span className='text-link cursor-pointer underline' key={`link-${props.index}`}>
        {!embedState && 
              <span onClick={() => goToYoutube(props.link)}>{props.link}<span onClick={(e) => { e.stopPropagation(); setEmbedState(!embedState); }}>{' [open embed]'}</span></span>
        }
        {embedState &&
            <>
              <span onClick={() => goToYoutube(props.link)}>{props.link}<span onClick={(e) => { e.stopPropagation(); setEmbedState(!embedState); }}>{' [remove embed]'}</span></span>

              <iframe className='w-full' width="420" height="315"
                src={`https://www.youtube.com/embed/${vidId}`} allowFullScreen>
              </iframe>
            </>
        }
    </span>
  )
}
