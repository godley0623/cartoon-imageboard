import React, { useState, useEffect } from 'react'
import { useThread } from '../hooks/useThread'
import Image from 'next/image'
import { changeGifToPng, convertBytesToKBorMB, getTranslatedText } from '../controller/controller'
import CommentRenderer from './CommentRenderer'
import ReplyPreview from './ReplyPreview'

export default function ReplyDisplay(props) {
    const thread = props.thread
    const reply = props.reply
    const op = props.op || false
    let bytes
    const languageOptions = [
        "Original",
        "English",
        "Spanish",
        "Chinese",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Korean"
    ]

    if ('fileData' in reply) {
        bytes = convertBytesToKBorMB(reply.fileData.bytes)
    }

    const { imageHover } = useThread();

    const [imageEnlarge, setImageEnlarge] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState('');
    const [borderHighlight, setBorderHighlight] = useState('border-black');
    const [replies, setReplies] = useState(null);
    const [replyPreview, setReplyPreview] = useState(0);
    const [comment, setComment] = useState(reply.comment);
    const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
    const [selectedGptModel, setSelectedGptModel] = useState('');

    useEffect(() => {
        if (borderHighlight !== 'border-black') {
            setTimeout(() => {
                setBorderHighlight('border-black')
            }, 2000)
        }
    },[borderHighlight])

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

    useEffect(() => {
        if (props.globalLanguage === 'Unchanged' || selectedGptModel === '' || !reply.comment) return

        if (props.globalLanguage === 'None') {
            setComment(reply.comment)
            return
        }
        
        setComment("Retrieving Translation Data From Server...")
        getTranslatedText(props.globalLanguage, reply.comment, selectedGptModel, setComment)
    }, [props.globalLanguage, selectedGptModel])

    useEffect(() => {
        setSelectedGptModel(props.gptModel)
    }, [props.gptModel])

    useEffect(() => {
        if (props.globalLanguage !== 'Original') return
        if (selectedLanguage === 'Original') {
            setComment(reply.comment)
            return
        }

        //setComment("Retrieving Translation Data From Server...")

        //getTranslatedText(selectedLanguage, reply.comment, setComment)
    }, [selectedLanguage])

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
        const postNum = e.target.innerText.split('>>')[1].replace(' (You)', '')
        const elementToScrollTo = document.getElementById(postNum)
        elementToScrollTo.scrollIntoView({ behavior: 'auto' })
        props.setHighlight(Number(postNum))
    }

    function handlePreview(reply) {
        if (replyPreview !== 0) return

        const replyNum = Number(reply.split('>>')[1])
        setReplyPreview(replyNum)
        //console.log(replyPreview)
    }
    function removePreview() {
        setReplyPreview(0)
        //console.log(replyPreview)
    }

    function changeSelectedLanguage(e) {
        setSelectedLanguage(e.target.value)
    }

  return (
    <div id={reply.postNumber} className={`relative bg-replyBG${isHighlighted} border ${borderHighlight} ml-1.5 mr-1.5 laptop:ml-3 laptop:mr-3 laptop:w-fit`}>
        <div className='flex flex-col bg-black pl-2 pr-2'>
            <div className='flex items-center gap-1'> 
                <p className='text-nameColor font-bold text-sm'>{reply.name}</p> 

                <div className='flex gap-2 text-light text-sm pt-1 pb-1'>
                    <p>{reply.created_at}</p>
                    <p>{`No. `}<span onClick={addPostNumToReply} className='cursor-pointer'>{`${reply.postNumber}`}</span></p>
                    
                    {/*<select className='text-black' onChange={(e) => changeSelectedLanguage(e)} value={selectedLanguage}>
                        {languageOptions.map((lang, index) => (
                            <option key={index} value={lang}>{lang}</option>
                        ))}
                        </select>*/}

                </div>
            </div>
            {op && <p className='text-subjectColor font-bold text-sm'>{reply.subject}</p>}
        </div>

        {!imageEnlarge && bytes && <div className={`flex flex-col bg-replyBG${isHighlighted} pb-2`}>
            <div className='text-light text-xxs text-center h-fit'>
               <div className='w-44 cursor-pointer pl-1 pr-1 pt-1 pb-1'>   
                    <Image width={500} height={500} onClick={enlargeImage} src={changeGifToPng(reply.fileData.url)} alt="reply" /> 

                    <div className='w-full'>
                        <p>{`${bytes} ${reply.fileData.format.toUpperCase()}`}</p>
                    </div>
               </div>
            </div>

            <div className='text-sm'>
                <CommentRenderer thread={thread}  yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={comment} handlePreview={handlePreview} removePreview={removePreview}/>
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
            <CommentRenderer thread={thread} yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={comment} handlePreview={handlePreview} removePreview={removePreview}/>
        </div>}

        {!bytes && <div className={`pt-2 flex gap-4 bg-replyBG${isHighlighted}`}>
            <CommentRenderer thread={thread} yous={props.yous} postNum={reply.postNumber} setHighlight={props.setHighlight} comment={comment} handlePreview={handlePreview} removePreview={removePreview}/>
        </div>}

        {replies && <div className={`flex gap-1.5 bg-replyBG${isHighlighted} text-link text-xs underline pl-2 pr-2 pt-2 cursor-pointer`}>
            {replies.map((reply, index) => (
                <p onMouseOver={() => handlePreview(reply)} onMouseOut={removePreview} onClick={(e) => goToReply(e)} key={index}>{reply}</p>
            ))}
        </div>}

        {replyPreview > 0 &&
            <ReplyPreview thread={thread} postNumber={reply.postNumber} bytes={bytes} yous={props.you} getYous={props.getYous} setHighlight={props.setHighlight} replyPreview={replyPreview} getReplyFromThread={props.getReplyFromThread}/>
        }
    </div>
  )
}
