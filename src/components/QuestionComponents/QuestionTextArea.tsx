import React from 'react'

type QuestionTextAreaProps = {
  fe_id: string
  props: {
    title: string
    placeholder?: string
    isRequired: boolean
  }
}
const QuestionTextArea: React.FC<QuestionTextAreaProps> = ({ fe_id, props }) => {
  const { title, placeholder = '', isRequired } = props
  return (
    <>
      <p className="flex items-baseline">
        {isRequired && <span className="text-red-500 mr-1">*</span>}
        <span>{title}</span>
      </p>
      <div className="mb-[16px] px-[5px]">
        <textarea required={isRequired} className="px-[12px] py-[6px] rounded-[3px] w-[100%] border-solid border-[1px] border-[#d8d8d8]" rows={5} name={fe_id} placeholder={placeholder} />
      </div>
    </>
  )
}

export default QuestionTextArea
