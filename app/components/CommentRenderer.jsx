import React from 'react';

function CommentRenderer({ comment }) {
  
  function formatReply(line, index) {
    const finalLine = []
    let normalWords = []
    const replyArrowClassName = 'text-reply underline cursor-pointer'
    const quoteClassName = 'text-quote'
    const normalClassName = 'text-light'

    function combineNormalWords(index, key) {
      if (normalWords.length > 0) {
        const combinedWord = normalWords.join(' ')
        finalLine.push(
          <p key={`normal-${index}-${key}`} className={normalClassName}>{combinedWord}</p>
        )
        normalWords = []
      }
    }

    if (line.startsWith('>') && !line.startsWith('>>')) {
      return (
        <p key={index} className={quoteClassName}>{line}</p>
      )
    }

    line.split(' ').map((word, key) => {
      if (word.startsWith('>>')) {
        combineNormalWords(index, key)

        finalLine.push(
          <p key={`arrow-${index}-${key}`} className={replyArrowClassName}>{word}</p>
        )
      } 
      
      else if (word === '' && key !== line.split(' ').length - 1) {
        finalLine.push(<br key={`break-${index}-${key}`}/>)
      }

      else {
        normalWords.push(word)
      }
    })
    
    combineNormalWords(index, '')

    return (
      <div key={index} className='flex gap-1.5'>
        {finalLine.map(el => el)}
      </div>
    )

  }

  return (
    <div className='text-sm pl-2 pr-2 pb-1'>
      {comment.split('\n').map((line, index) => {
        if (line) {
          return(formatReply(line, index))
        } 
        else if (index !== comment.split('\n').length-1) {
          return <br key={index}/>
        }
      })}
    </div>
  );
}

export default CommentRenderer;
