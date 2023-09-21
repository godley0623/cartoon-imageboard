import React from 'react'
import CommentRenderer from './CommentRenderer'

export default function ReplyPreview( { bytes, getYous, setHighlight, replyPreview, getReplyFromThread } ) {
    const reply = getReplyFromThread(replyPreview)
    let hasFile
    'fileData' in reply ? hasFile = true : hasFile = false
    const op = isOp()
    const replies = getYous[`${reply.postNumber}`]
    
    function isOp() {
        try {
            const replies = reply.replies
            return true
        } catch {
            return false
        }
    }
    return (
        <div id='reply-preview' className='flex mt-2 mb-2 ml-1'>
        <p className='text-light text-sm m-0 p-0'>{'>>'}</p>
        <div className={`border border-black laptop:ml-3 laptop:mr-3 laptop:w-fit`}>
            <div className='flex flex-col bg-black pl-2 pr-2'>
                <div className='flex items-center gap-1'> 
                    <p className='text-nameColor font-bold text-sm'>{reply.name}</p> 
    
                    <div className='flex gap-2 text-light text-sm pt-1 pb-1'>
                        <p>{reply.created_at}</p>
                        <p>{`No. `}<span className='cursor-pointer'>{`${reply.postNumber}`}</span></p>
                    </div>
                </div>
                {op && <p className='text-subjectColor font-bold text-sm'>{reply.subject}</p>}
            </div>
    
            {hasFile && <div className={`flex flex-col bg-replyBGH pb-2`}>
                <div className='text-light text-xxs text-center h-fit'>
                   <div className='w-44 cursor-pointer pl-1 pr-1 pt-1 pb-1'>   
                        <img width={500} height={500} src={reply.fileData.url} alt="reply" /> 
    
                        <div className='w-full'>
                            <p>{`${bytes} ${reply.fileData.format.toUpperCase()}`}</p>
                        </div>
                   </div>
                </div>
    
                <div className='text-sm'>
                    <CommentRenderer yous={ {} } postNum={reply.postNumber} setHighlight={setHighlight} comment={reply.comment}/>
                </div>
            </div>}
    
            {!hasFile && <div className={`pt-2 flex gap-4 bg-replyBGH`}>
                <CommentRenderer yous={ {} } postNum={reply.postNumber} setHighlight={setHighlight} comment={reply.comment}/>
            </div>}
    
            {replies && <div className={`flex gap-1.5 bg-replyBGH text-link text-xs underline pl-2 pr-2 pt-2 cursor-pointer`}>
                {replies.map((reply, index) => (
                    <p key={index}>{reply}</p>
                ))}
            </div>}
        </div>
        </div>
    )
}
