"use client"
import React, { useState } from 'react'
import MainButton from './MainButton'

export default function ThreadPost() {
    const labelCss = 'flex items-center bg-labelBG text-light text-sm font-bold border border-labelBorder w-20'

    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [file, setFile] = useState('')
    
    function uploadThread() {
        console.log(file)
    }

  return (
    <div className='flex flex-col items-center gap-0.25'>
        <div className='flex flex-row'>
            <div className={labelCss} for="name">Name</div>
            <input onChange={(e) => setName(e.target.value)} className='w-60 border border-inputBorder' type="text" placeholder='Anonymous' />
        </div>
        <div className='flex flex-row'>
            <div className={labelCss} for="subject">Subject</div>
            <input onChange={(e) => setSubject(e.target.value)} className='w-60 border border-inputBorder' type="text" />
        </div>
        <div className='flex flex-row'>
            <div className={labelCss} for="comment">Comment</div>
            <textarea onChange={(e) => setComment(e.target.value)} className='flex items-start w-60 h-20 border border-inputBorder' type='text'></textarea>
        </div>
        <div className='flex flex-row'>
            <div className={labelCss} for="file">File</div>
            <input onChange={(e) => setFile(e.target.files[0])} className='w-60 text-light' type="file" />
        </div>
        <MainButton click={uploadThread} text='Post'/>
    </div>
  )
}
