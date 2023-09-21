import React from 'react'
import Image from 'next/image'
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
        
        <div style={ {margin: '0 auto'} } className='w-32 cursor-pointer flex justify-center'> <Image className='w-auto max-h-44' width={500} height={500} src={image} alt="Thread" /> </div>
        
        <div className='w-36 text-center'><p className='text-light text-xs'>{`Replies: ${thread.replies.length}`}</p></div>
        
        <div className='w-36 max-h-28 text-center overflow-auto'><p className='text-light text-xs'> {thread.subject && <span className='font-bold'>{`${thread.subject}: `}</span>} {thread.comment}</p></div>

    </div>
  )
}
