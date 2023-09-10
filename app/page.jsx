"use client"
import { useState } from "react"
import MainButton from "./components/MainButton"
import ThreadPost from "./components/ThreadPost"

export default function Home() {
  const [postToggle, setPostToggle] = useState('')

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
        <h1 className='text-light text-3xl font-bold font-tahoma'>Cartoons & Comics</h1>
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
    </main>
  )
}
