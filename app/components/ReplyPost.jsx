import React, { useState, useEffect, useRef } from 'react'
import MainButton from './MainButton'
import axios from 'axios'
import { getCurrentDateTimeFormatted } from '../controller/controller'

export default function ReplyPost(props) {
    const serverUrl = 'https://cartoonhub-server.vercel.app/'
    const thread = props.thread

    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [file, setFile] = useState("")
    const [fileData, setFileData] = useState({})
    const [postNumber, setPostNumber] = useState(0)
    const [canPost, setCanPost] = useState(true)
    const [postReady, setPostReady] = useState(false)

    const commentRef = useRef(null)

    useEffect(() => {
        if (!props.replies) return

        commentRef.current.value = comment + props.replies
        setComment(comment + props.replies)
        props.setReplies('')
    }, [props.replies])

    useEffect(() => {
        if (postReady) {
            const replyData = {
                name: name || 'Anonymous',
                comment: comment,
                fileData: fileData,
                postNumber: postNumber,
                created_at: getCurrentDateTimeFormatted()
            }
            thread.replies.push(replyData)
            axios.put(`${serverUrl}threads/reply/${thread.postNumber}`, thread.replies)
            .then(() => {
                window.location.reload()
            })
        }
    }, [postReady])

    function uploadImage(postNumber) {
        if (!file) return setPostReady(true)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", `${postNumber}`)
        formData.append("upload_preset", "yk5mb2bg")

        axios.post("https://api.cloudinary.com/v1_1/dpvihyj9b/image/upload", formData)
            .then((response) => {
                const data = response.data
                console.log(data)
                setFileData({
                    filename: data.original_filename,
                    format: data.format,
                    width: data.width,
                    height: data.height,
                    bytes: data.bytes,
                    url: data.url
                })
                setPostReady(true)
            })
    }

    function uploadReply() {
        if (!canPost) return
        if (!comment && !file) return alert("Please provide a comment or an image")

        setCanPost(false)
        axios.get(serverUrl + 'postnumber')
        .then((response) => {
            setPostNumber(response.data[0].postNumber)
            axios.put(serverUrl + 'postnumber/increase')
            uploadImage(thread.postNumber)
        })
    }

    function handleComment(e) {
        setComment(e.target.value)
        console.log(comment)
    }

  return (
    <div style={ {zIndex: '999'} } className='border border-light w-80 fixed top-1 flex flex-col items-center bg-borderColor'>

        <div className='text-light text-xs w-full bg-black border-b border-light mb-1'>
            <div className='w-full flex justify-between'> 
                <div className='w-full text-center font-bold pt-1'> <p>{`Reply to Thread No. ${thread.postNumber}`}</p> </div>
                <div onClick={props.closeForm} className='cursor-pointer border-dotted border border-light p-1 font-bold'>X</div>
            </div>
        </div>

        <div className='w-60 border border-inputBorder text-sm'>
            <input onChange={(e) => setName(e.target.value)} className='w-full' type="text" placeholder='Name' />
        </div>

        <div className='text-sm'>
            <textarea ref={commentRef} onChange={(e) => handleComment(e)} className='w-60 h-24 pl-1 text-xs'></textarea>
        </div>

        <div className='text-light text-xs w-60'>
            <input onChange={(e) => setFile(e.target.files[0])} type="file" accept='image/*'/>
        </div>

        <div className='pt-2 pb-3'>
            <MainButton click={uploadReply} text='Post' />
        </div>

    </div>
  )
}
