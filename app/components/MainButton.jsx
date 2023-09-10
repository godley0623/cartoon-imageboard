import React from 'react'

export default function MainButton(props) {
  return (
    <>
        <span onClick={props.click} className='bg-gradient-to-b from-buttonGradient to-buttonBG text-buttonText border-2 border-buttonBorder font-arial p-2 m-2 font-bold text-xs cursor-pointer'>{props.text}</span>
    </>
  )
}
