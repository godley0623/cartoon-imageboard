"use client"
import { useState, useEffect } from "react"
import MainButton from "./components/MainButton"
import ThreadPost from "./components/ThreadPost"
import ThreadDisplay from "./components/ThreadDisplay"
import axios from "axios"
import { sortThreadsByCreatedAt } from "./controller/controller"

export default function Home() {
  const serverUrl = 'https://cartoonhub-server.vercel.app/'

  const [postToggle, setPostToggle] = useState('')
  const [threads, setThreads] = useState([])

  useEffect(() => {
    axios.get(serverUrl + 'threads')
    .then(response => {
      const data = response.data
      const threadsBumpOrder = sortThreadsByCreatedAt(data)
      setThreads(threadsBumpOrder)
    })
  }, [])

  function toggleForm() {
    if (postToggle) {
      setPostToggle('')
    } else {
      setPostToggle('on')
    }
  }

  return (
    <main>
      <div className='w-full flex flex-col items-center border-borderColor border-b-2'> 
        <h1 className='text-light text-3xl font-bold font-tahoma'>CartoonHub</h1>
        <p className="text-light">Discuss your favorite cartoon shows</p>
      </div>

      <div className="w-full flex justify-center border-borderColor border-b-2">
        {!postToggle &&
        <MainButton click={toggleForm} text='Start a New Thread' />
        }
        {postToggle &&
        <div className="flex flex-col items-center">
          <MainButton click={toggleForm} text='Close Post Form'/>
          <ThreadPost />
        </div>
        }
      </div>

      <div className="w-full flex justify-center border-borderColor border-b-2">
        <MainButton text='Bottom'/>
        <MainButton text='Refresh'/>
      </div>

      <div className="w-full mt-6 flex flex-wrap gap-4 justify-center border-borderColor border-b-2 pb-10">
        {threads.map((thread, key) => (
          <ThreadDisplay key={key} thread={thread}/>
        ))}
      </div>

      <div className="w-full flex justify-center border-borderColor border-b-2">
        <MainButton text='Top'/>
        <MainButton text='Refresh'/>
      </div>

    </main>
  )
}
