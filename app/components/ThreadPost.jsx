"use client"
import React, { useState, useEffect } from 'react'
import MainButton from './MainButton'
import axios from 'axios'
import { getCurrentDateTimeFormatted } from '../controller/controller'



export default function ThreadPost() {
    const serverUrl = 'https://cartoonhub-server.vercel.app/'

    const labelCss = 'flex items-center bg-labelBG text-light text-sm font-bold border border-labelBorder w-20'

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [file, setFile] = useState('')
    const [fileData, setFileData] = useState({})
    const [threadData, setThreadData] = useState({})
    const [postNumber, setPostNumber] = useState(0)
    const [canPost, setCanPost] = useState(true)
    const [inputStatus, setInputStatus] = useState('')

    useEffect(() => {
        if (JSON.stringify(fileData) !== '{}') {
            setThreadData({
                name: name,
                subject: subject,
                comment: comment,
                fileData: fileData,
                created_at: getCurrentDateTimeFormatted(),
                postNumber: postNumber,
                replies: []
            })
        }
    }, [fileData])

    useEffect(() => {
        if (JSON.stringify(threadData) !== '{}') {
            console.log(threadData)
            axios.post(serverUrl + 'threads', threadData)
            //Go To thread once created
        }
    }, [threadData])
    
    function uploadImage(postNumber) {
        if (!file) return

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
        setInputStatus('Creating Thread...')
        axios.get(serverUrl + 'postnumber')
        .then((response) => {
            setPostNumber(response.data[0].postNumber)
            axios.put(serverUrl + 'postnumber/increase')
            uploadImage(response.data[0].postNumber)
        })
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
            <textarea onChange={(e) => setComment(e.target.value)} className='flex items-start w-60 h-20 border border-inputBorder text-xs' type='text'></textarea>
        </div>
        <div className='flex flex-row'>
            <div className={labelCss}>File</div>
            <input onChange={(e) => setFile(e.target.files[0])} className='w-60 text-light' type="file" accept='image/*'/>
        </div>
        <MainButton click={uploadThread} text='Post'/>
        {inputStatus &&
        <div className='text-light font-bold'>{inputStatus}</div>
        }
    </div>
  )
}
