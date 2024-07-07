import React from 'react'

type QuestionInfoProps = {
  title: string
  desc?: string
}
const QuestionInfo: React.FC<QuestionInfoProps> = ({ title, desc }) => {
  return (
    <div className="text-center">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export default QuestionInfo
