import React, { useState, useEffect } from 'react'
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
    const [isHighlighted, setIsHighlighted] = useState('') 
    const [borderHighlight, setBorderHighlight] = useState('border-black')
    const [replies, setReplies] = useState(null)

    useEffect(() => {
        if (props.highlight === reply.postNumber) {
            setIsHighlighted('H')
            setBorderHighlight('border-yellow')
        } else {
            setIsHighlighted('')
            setBorderHighlight('border-black')
        }
    }, [props.highlight])

    useEffect(() => {
        if (props.getYous) {
            setReplies(props.getYous[`${reply.postNumber}`])
        }
    }, [props.getYous])

    function enlargeImage() {
        setImageEnlarge(!imageEnlarge)
    }

    function addPostNumToReply() {
        const postForm = props.postToggle
        if (!postForm) props.setPostToggle(!postForm)

        props.setReplies(`>>${reply.postNumber}\n`)
    }

    function goToImage() {
        window.open(reply.fileData.url, '_blank')
    }

    function goToReply(e) {
        const postNum = e.target.innerText.split('>>')[1]
        const elementToScrollTo = document.getElementById(postNum)
        elementToScrollTo.scrollIntoView({ behavior: 'auto' });
        props.setHighlight(Number(postNum))
      }

  return (
    <div id={reply.postNumber} className={`border ${borderHighlight} ml-1.5 mr-1.5 laptop:ml-3 laptop:mr-3 laptop:w-fit`}>
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

        {!imageEnlarge && bytes && <div className={`flex flex-col bg-replyBG${isHighlighted} pb-2`}>
            <div className='text-light text-xxs text-center h-fit'>
               <div className='w-44 cursor-pointer pl-1 pr-1 pt-1 pb-1'>   
                    <Image width={500} height={500} onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> 

                    <div className='w-full'>
                        <p>{`${bytes} ${reply.fileData.format.toUpperCase()}`}</p>
                    </div>
               </div>
            </div>

            <div className='text-sm'>
                <CommentRenderer yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={reply.comment}/>
            </div>
        </div>}

        {imageEnlarge && bytes && <div className={` pb-2flex flex-col gap-4 bg-replyBG${isHighlighted}`}>
            <div className='text-light text-xs text-center'>
                <div className='w-fit pl-3 pr-3 pt-2 pb-1 cursor-pointer'>    
                    <Image width={500} height={500} onClick={enlargeImage} src={reply.fileData.url} alt="reply" /> 

                    <div className='w-full'>
                        <p onClick={goToImage} className='text-link underline cursor-pointer'>{`${reply.fileData.filename}.${reply.fileData.format}`}</p>
                        <p className='cursor-auto'>{`${bytes} (${reply.fileData.width}x${reply.fileData.height})`}</p>
                    </div>
                </div>
            </div>
            <CommentRenderer yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={reply.comment}/>
        </div>}

        {!bytes && <div className={`pt-2 flex gap-4 bg-replyBG${isHighlighted}`}>
            <CommentRenderer yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={reply.comment}/>
        </div>}

        {replies && <div className={`flex gap-1.5 bg-replyBG${isHighlighted} text-link text-xs underline pl-2 pr-2 pt-2 cursor-pointer`}>
            {replies.map((reply, index) => (
                <p onClick={(e) => goToReply(e)} key={index}>{reply}</p>
            ))}
        </div>}
    </div>
  )
}
