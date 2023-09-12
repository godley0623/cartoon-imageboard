import React from 'react'
import { useRouter } from 'next/navigation'

export default function ThreadDisplay(props) {
    const router = useRouter()  

    const thread = props.thread
    const image = thread.fileData.url

    function goToThread() {
      router.push('/thread/' + thread.postNumber)
    }

  return (
    <div onClick={goToThread}>
        <div className='w-32'> <img src={image} alt="Thread" /> </div>
        <div className='w-36 text-center'><p className='text-light text-xs'>{`Replies: ${thread.replies.length}`}</p></div>
        <div className='w-36 text-center overflow-hidden'><p className='text-light text-xs'> {thread.subject && <span className='font-bold'>{`${thread.subject}: `}</span>} {thread.comment}</p></div>
    </div>
  )
}
