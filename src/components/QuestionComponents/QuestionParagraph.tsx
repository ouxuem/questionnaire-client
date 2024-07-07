import React from 'react'

type QuestionParagraphProps = {
  text: string
  isCenter?: boolean
}
const QuestionParagraph: React.FC<QuestionParagraphProps> = ({ text, isCenter }) => {
  const text_list = text.split('\n')
  return (
    <p className={isCenter ? 'text-center' : ''}>
      {text_list.map((item, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        )
      })}
    </p>
  )
}

export default QuestionParagraph
