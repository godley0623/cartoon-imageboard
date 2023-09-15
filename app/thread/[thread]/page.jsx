"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation' 
import axios from 'axios'
import ReplyDisplay from '@/app/components/ReplyDisplay'
import MainButton from '@/app/components/MainButton'
import ReplyPost from '@/app/components/ReplyPost'

export default function ThreadPage() {
    const serverUrl = 'https://cartoonhub-server.vercel.app/'
    const router = useRouter()

    const params = useParams()
    const threadNum = Number(params.thread)

    const [thread, setThread] = useState({})
    const [postToggle, setPostToggle] = useState(false)
    const [replies, setReplies] = useState("")

    useEffect(() => {
      axios.get(`${serverUrl}threads/${threadNum}`)
      .then(response => {
        const data = response.data
        console.log(data)
        setThread(data)
      })
    }, [])

    function toggleForm() {
      setPostToggle(!postToggle)
    }

    function returnHome() {
      router.push('/')
    }

  return (
    <div>
      <div className='w-full flex flex-col items-center border-borderColor border-b-2'> 
        <h1 className='text-light text-3xl font-bold font-tahoma'>CartoonHub</h1>
        <p className="text-light">Discuss your favorite cartoon shows</p>
      </div>

      <div className='flex justify-center'>
        <MainButton click={returnHome} text='Return'/>
        <MainButton click={() => window.scrollTo(0, document.body.scrollHeight)} text='Bottom'/>
        <MainButton text='Update'/>
      </div>

      {!postToggle &&<div className='flex justify-center mb-4 border-borderColor border-b-2'>
        <MainButton click={toggleForm} text='Post Reply'/>
      </div>}
      {postToggle &&<div className='flex justify-center mb-4 border-borderColor border-b-2'>
        <MainButton click={toggleForm} text='Close Post Form'/>
        <ReplyPost replies={replies} setReplies={setReplies} closeForm={toggleForm} thread={thread}/>
      </div>}

      {JSON.stringify(thread) !== '{}' && 
        <>
          <ReplyDisplay postToggle={postToggle} setPostToggle={setPostToggle} setReplies={setReplies} op={true} reply={thread}/>
          
          <div>
          {thread.replies.map((reply, key) => (
            <div key={key} className='mt-2'>
              <ReplyDisplay postToggle={postToggle} setPostToggle={setPostToggle} setReplies={setReplies} reply={reply}/>
            </div>
          ))}
          </div>
        </>
      }

      <div className='flex justify-center border-borderColor border-t-2 mt-3'>
        <MainButton click={returnHome} text='Return'/>
        <MainButton click={() => window.scrollTo(0, 0)} text='Top'/>
        <MainButton text='Update'/>
      </div>

    </div>
  )
}
