import React, { useState } from 'react'
import Image from 'next/image'
import { convertBytesToKBorMB } from '../controller/controller'
import CommentRenderer from './CommentRenderer'

export default function ReplyDisplay(props) {
    const reply = props.reply
    const op = props.op || false
    let bytes;
    if ('fileData' in reply) {
        bytes = convertBytesToKBorMB(reply.fileData.bytes)
    }

    const [imageEnlarge, setImageEnlarge] = useState(false)

    function enlargeImage() {
        setImageEnlarge(!imageEnlarge)
    }

    function addPostNumToReply() {
        const postForm = props.postToggle
        if (!postForm) props.setPostToggle(!postForm)

        props.setReplies(`>>${reply.postNumber}\n`)
    }

  return (
    <div className='ml-3 mr-3 laptop:w-fit'>
        <div className='flex flex-col bg-black pl-2 pr-2'>
            <div className='flex items-center gap-1'> 
                <p className='text-nameColor font-bold text-sm'>{reply.name}</p> 

                <div className='flex gap-2 text-light text-sm pt-1 pb-1'>
                    <p>{reply.created_at}</p>
                    <p>{`No. `}<span onClick={addPostNumToReply} className='cursor-pointer'>{`${reply.postNumber}`}</span></p>
                </div>
            </div>
            {op && <p className='text-subjectColor font-bold text-sm'>{reply.subject}</p>}
        </div>

        {!imageEnlarge && bytes && <div className='flex flex-col bg-replyBG border-b border-black pb-2'>
            <div className='text-light text-xxs text-center h-fit'>
               <div className='w-44 cursor-pointer pl-1 pr-1 pt-1 pb-1'>   
                    <Image width={500} height={500} onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> 

                    <div className='w-full'>
                        <p>{`${bytes} ${reply.fileData.format.toUpperCase()}`}</p>
                    </div>
               </div>
            </div>

            <div className='text-sm'>
                <CommentRenderer comment={reply.comment}/>
            </div>
        </div>}

        {imageEnlarge && bytes && <div className=' pb-2flex flex-col gap-4 bg-replyBG border-b border-black'>
            <div className='text-light text-xs text-center'>
                <div className='w-fit pl-3 pr-3 pt-2 pb-1 cursor-pointer'>    
                    <Image width={500} height={500} onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> 

                    <div className='w-full'>
                        <p>{`${reply.fileData.filename}.${reply.fileData.format}`}</p>
                        <p className='cursor-auto'>{bytes}</p>
                    </div>
                </div>
            </div>
            <CommentRenderer comment={reply.comment}/>
        </div>}

        {!bytes && <div className='pt-2 flex gap-4 bg-replyBG border-b border-black'>
            <CommentRenderer comment={reply.comment}/>
        </div>}

        <div></div>
    </div>
  )
}
