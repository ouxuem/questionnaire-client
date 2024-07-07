import React from 'react'

type QuestionTitleProps = {
  text: string
  level: number
  isCenter?: boolean
}
const QuestionTitle: React.FC<QuestionTitleProps> = ({ text, level, isCenter }) => {
  if (level === 1) {
    return <h1 className={isCenter ? 'text-center' : ''}>{text}</h1>
  }
  if (level === 2) {
    return <h2 className={isCenter ? 'text-center' : ''}>{text}</h2>
  }
  if (level === 3) {
    return <h3 className={isCenter ? 'text-center' : ''}>{text}</h3>
  }
  return null
}

export default QuestionTitle
