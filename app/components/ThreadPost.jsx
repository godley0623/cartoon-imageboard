"use client"
import React, { useState } from 'react'
import MainButton from './MainButton'
import axios from 'axios'

export default function ThreadPost() {
    const labelCss = 'flex items-center bg-labelBG text-light text-sm font-bold border border-labelBorder w-20'

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [file, setFile] = useState('')
    const [fileData, setFileData] = useState({})
    const [canPost, setCanPost] = useState(true)
    
    function uploadImage() {
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
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
            })
    }

    function uploadThread() {
        if (!canPost) return
        if (!comment) {
            alert("Please provide a comment")
            return
        }
        if (!file) {
            alert("Please provide a file")
            return
        }
        if (!name) {
            setName("Anonymous")
        }
        setCanPost(false)
        uploadImage()
    }

  return (
    <div className='flex flex-col items-center gap-0.25'>
        <div className='flex flex-row'>
            <div className={labelCss}>Name</div>
            <input onChange={(e) => setName(e.target.value)} className='w-60 border border-inputBorder' type="text" placeholder='Anonymous' />
        </div>
        <div className='flex flex-row'>
            <div className={labelCss}>Subject</div>
            <input onChange={(e) => setSubject(e.target.value)} className='w-60 border border-inputBorder' type="text" />
        </div>
        <div className='flex flex-row'>
            <div className={labelCss}>Comment</div>
            <textarea onChange={(e) => setComment(e.target.value)} className='flex items-start w-60 h-20 border border-inputBorder' type='text'></textarea>
        </div>
        <div className='flex flex-row'>
            <div className={labelCss}>File</div>
            <input onChange={(e) => setFile(e.target.files[0])} className='w-60 text-light' type="file" />
        </div>
        <MainButton click={uploadThread} text='Post'/>
    </div>
  )
}
