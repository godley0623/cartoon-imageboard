import React from 'react';

function CommentRenderer({ comment }) {
  return (
    <div className='text-sm pl-2 pb-2'>
      {comment.split('\n').map((line, index) => {
        // Check if the line starts with ">"
        const regex = /^>>(?:\s|[^>])*/g;
        const replyMatches = line.match(regex);

        let isQuote;
        if (!replyMatches) isQuote = line.trim().startsWith('>');

        if (replyMatches) {
          // Define a class name for styling
          const className = 'text-reply underline cursor-pointer';

          return (
            <p key={index}>
              {replyMatches.map((match, i) => (
                <span key={i} className={className}>
                  {match}
                </span>
              ))}
              {line.substring(replyMatches.join('').length)}
            </p>
          );
        }

        // Define a class name for styling
        const className = isQuote ? 'text-quote' : 'text-light';

        return (
          <p key={index} className={className}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default CommentRenderer;
