"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation' 
import axios from 'axios'
import ReplyDisplay from '@/app/components/ReplyDisplay'
import MainButton from '@/app/components/MainButton'
import ReplyPost from '@/app/components/ReplyPost'
import { getAnonId, getGptSetting, getLanguageSetting, saveGptSetting, saveLanguageSetting } from '@/app/controller/controller'
import Image from 'next/image'
import banner from '../../../assets/cartoonhub_banner.gif'

export default function ThreadPage() {
    const serverUrl = 'https://cartoonhub-server.vercel.app/'
    const router = useRouter()

    const params = useParams()
    const threadNum = Number(params.thread)

    const languageOptions = [
      "Unchanged",
      "None",
      "English",
      "Spanish",
      "Chinese",
      "Russian",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Korean"
    ]

    const gptOptions = [
      "gpt-3.5-turbo",
      "gpt-4"
    ]

    const [thread, setThread] = useState({})
    const [postToggle, setPostToggle] = useState(false)
    const [replies, setReplies] = useState("")
    const [highlight, setHighlight] = useState(0)
    const [globalLanguage, setGlobalLanguage] = useState(languageOptions[1])
    const [gptModel, setGptModel] = useState(gptOptions[0])
    const [getYous, setGetYous] = useState(null)
    let yous = {}

    useEffect(() => {
      axios.get(`${serverUrl}threads/${threadNum}`)
      .then(response => {
        const data = response.data
        //console.log(data)
        setThread(data)
      })
      
      setGlobalLanguage(getLanguageSetting())
      setGptModel(getGptSetting())

      getAnonId()
    }, [])

    useEffect(() => {
      if (JSON.stringify(thread) !== '{}') {
        setGetYous(yous)
      }
    }, [thread])

    function toggleForm() {
      setPostToggle(!postToggle)
    }

    function returnHome() {
      router.push('/')
    }

    function getReplyFromThread(postNum) {
      if (thread.postNumber === postNum) return thread

      let result
      thread.replies.forEach((reply) => {
          if (reply.postNumber === postNum) result = reply
      })

      return result
    }

    function changeGlobalLanguage(e) {
      setGlobalLanguage(e.target.value)
      saveLanguageSetting(e.target.value)
    }

    function changeGptModel(e) {
      setGptModel(e.target.value)
      saveGptSetting(e.target.value)
    }

  return (
    <div>
      <div className='w-full flex flex-col items-center border-borderColor border-b-2'> 
        <h1 className='text-light text-3xl font-bold font-tahoma'>CartoonHub</h1>
        <p className="text-light">Discuss your favorite cartoons and comics</p>
        <Image className='w-auto h-14 mb-1.5 px-4' width={400} height={400} src={banner} alt="Banner" />
      </div>

      <div className='flex justify-center'>
        <MainButton click={returnHome} text='Return'/>
        <MainButton click={() => window.scrollTo(0, document.body.scrollHeight)} text='Bottom'/>
        <MainButton text='Update'/>
      </div>

      {!postToggle &&<div className='flex flex-col items-center justify-center mb-4 border-borderColor border-b-2'>
        <MainButton click={toggleForm} text='Post Reply'/>
        <div className='flex mt-2.5 gap-2'>
          <p className='text-light font-bold'>Translate Thread:</p>
          <select className='text-sm text-center' onChange={(e) => changeGlobalLanguage(e)} value={globalLanguage}>
            {languageOptions.map((lang, index) => (
              <option value={lang} key={index}>{lang}</option>
            ))}
          </select>
          <select onChange={(e) => changeGptModel(e)} className='text-sm text-center' value={gptModel}>
            {gptOptions.map((model, index) => (
              <option value={model} key={index}>{model}</option>
            ))}
          </select>
        </div>
      </div>}
      {postToggle &&<div className='flex justify-center mb-4 border-borderColor border-b-2'>
        <MainButton click={toggleForm} text='Close Post Form'/>
        <ReplyPost replies={replies} setReplies={setReplies} closeForm={toggleForm} thread={thread}/>
      </div>}

      {JSON.stringify(thread) !== '{}' && 
        <>
          <ReplyDisplay thread={thread} gptModel={gptModel} globalLanguage={globalLanguage} yous={yous} getYous={getYous} highlight={highlight} setHighlight={setHighlight} postToggle={postToggle} setPostToggle={setPostToggle} setReplies={setReplies} op={true} reply={thread} getReplyFromThread={getReplyFromThread}/>
          
          <div>
          {thread.replies.map((reply, key) => (
            <div key={key} className='mt-2'>
              <ReplyDisplay thread={thread} gptModel={gptModel} globalLanguage={globalLanguage} yous={yous} getYous={getYous}  highlight={highlight} setHighlight={setHighlight} postToggle={postToggle} setPostToggle={setPostToggle} setReplies={setReplies} reply={reply} getReplyFromThread={getReplyFromThread}/>
            </div>
          ))}
          </div>
        </>
      }

      <div className='flex justify-center border-borderColor border-t-2 mt-3 pt-3 pb-4'>
        <MainButton click={returnHome} text='Return'/>
        <MainButton click={() => window.scrollTo(0, 0)} text='Top'/>
        <MainButton text='Update'/>
      </div>

    </div>
  )
}
