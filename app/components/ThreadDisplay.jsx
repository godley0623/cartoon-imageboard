import React from 'react'

export default function ThreadDisplay(props) {
    const thread = props.thread
    const image = thread.fileData.url
  return (
    <div>
        <img className='w-36 h-36' src={image} alt="Thread" />
        <div className='w-36 text-center'><p className='text-light text-xs'>{`Replies: ${thread.replies.length}`}</p></div>
        <div className='w-36 text-center overflow-hidden'><p className='text-light text-xs'> {thread.subject && <span className='font-bold'>{`${thread.subject}: `}</span>} {thread.comment}</p></div>
    </div>
  )
}
