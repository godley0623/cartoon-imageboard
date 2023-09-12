"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' 
import axios from 'axios'
import ReplyDisplay from '@/app/components/ReplyDisplay'

export default function page() {
    const serverUrl = 'http://localhost:4000/'

    const params = useParams()
    const threadNum = Number(params.thread)

    const [thread, setThread] = useState({})

    useEffect(() => {
      axios.get(`${serverUrl}threads/${threadNum}`)
      .then(response => {
        const data = response.data
        console.log(data)
        setThread(data)
      })
    }, [])

  return (
    <div>
      {JSON.stringify(thread) !== '{}' && 
        <ReplyDisplay reply={thread}/>
      }
    </div>
  )
}
