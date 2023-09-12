import React, { useState } from 'react'

export default function ReplyDisplay(props) {
    const reply = props.reply
    const op = props.op || false

    const [imageEnlarge, setImageEnlarge] = useState(false)

    function enlargeImage() {
        setImageEnlarge(!imageEnlarge)
    }

  return (
    <div>
        <div className='flex gap-4 bg-black pl-2'>
            <div className='pt-1 pb-1'> 
                <p className='text-nameColor font-bold text-sm'>{reply.name}</p> 
                {op && <p className='text-subjectColor font-bold text-sm'>{reply.subject}</p>}
            </div>
            <div className='flex gap-2 text-light text-sm pt-1 pb-1'>
                <p>{reply.created_at}</p>
                <p>{`No. ${reply.postNumber}`}</p>
            </div>
        </div>

        {!imageEnlarge && <div className='flex gap-4 bg-replyBG border-b border-black'>
            <div className='text-light text-xs text-center'>
               <div className='w-32'> <img onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> </div>
                <p>{`File Size ${reply.fileData.format.toUpperCase()}`}</p>
            </div>
            <div className='mt-2 text-sm'>
                <p className='text-light'>{reply.comment}</p>
            </div>
        </div>}

        {imageEnlarge && <div className='flex flex-col gap-4 bg-replyBG border-b border-black'>
            <div className='text-light text-xs text-center'>
               <div className='pl-3 pr-3 pt-2 pb-1'> <img onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> </div>
                <p>{`${reply.fileData.filename}.${reply.fileData.format}`}</p>
                <p>file size</p>
            </div>
            <div className='mt-2 text-sm text-light pb-4 pl-4'>
                <p>{reply.comment}</p>
            </div>
        </div>}

        <div></div>
    </div>
  )
}
