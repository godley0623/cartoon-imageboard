import React from 'react';
import YoutubeEmbedRenderer from './YoutubeEmbedRenderer';
import { addToArray, youCheck } from '../controller/controller';

function CommentRenderer({ thread, comment, setHighlight, postNum, yous, handlePreview, removePreview }) {
  function formatReply(line, index) {
    const finalLine = []
    let normalWords = []
    const replyArrowClassName = 'text-reply underline cursor-pointer'
    const quoteClassName = 'text-quote'
    const normalClassName = 'text-light h-fit'

    function goToReply(e) {
      const postNum = e.target.innerText.split('>>')[1].replace(' (You)', '')
      const elementToScrollTo = document.getElementById(postNum)
      elementToScrollTo.scrollIntoView({ behavior: 'auto' });
      setHighlight(Number(postNum))
    }

    function combineNormalWords(index, key) {
      if (normalWords.length > 0) {
        const combinedWord = normalWords.join(' ') + " "
        finalLine.push(
          <span key={`normal-${index}-${key}`} className={normalClassName}>{combinedWord}</span>
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
        const newWord = youCheck(thread, word)

        finalLine.push(
          <span onMouseOver={() => handlePreview(word)} onMouseOut={removePreview} onClick={(e) => goToReply(e)} key={`arrow-${index}-${key}`} className={replyArrowClassName}>{newWord + " "}</span>
        )

        const ogPost = word.split('>>')[1]
        if (!yous[`${ogPost}`]) {
          yous[`${ogPost}`] = [`>>${postNum}`]
        } else {
          yous[`${ogPost}`] = addToArray(yous[`${ogPost}`], `>>${postNum}`)
        }
      }

      else if (word.startsWith('https://www.youtube.com') || word.startsWith('https://youtu.be/')) {
        combineNormalWords(index, key)

        finalLine.push(<YoutubeEmbedRenderer key={`youtube-${index}-${key}`} index={index} link={word}/>)
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
      <p key={index}>
        {finalLine.map((el) => (
          <>{el}</>
        ))}
      </p>
    )
  }

  return (
    <div className='text-sm pl-2 pr-2 pb-1'>
      {comment.split('\n').map((line, index) => {
        if (line) {
          return formatReply(line, index);
        } else if (index !== comment.split('\n').length - 1) {
          return <br key={`break-${index}`} />;
        }

        return null;
      })}
    </div>
  );
}

export default CommentRenderer;