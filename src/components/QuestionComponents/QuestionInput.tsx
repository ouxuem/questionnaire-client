import React from 'react'

type QuestionInputProps = {
  fe_id: string
  props: {
    title: string
    placeholder?: string
    isRequired?: boolean
  }
}
const QuestionInput: React.FC<QuestionInputProps> = ({ fe_id, props }) => {
  const { title, placeholder = '', isRequired } = props
  return (
    <>
      <p className="flex items-baseline">
        {isRequired && <span className="text-red-500 mr-1">*</span>}
        <span>{title}</span>
      </p>
      <div className="mb-[16px] px-[5px]">
        <input required={isRequired} className="px-[12px] py-[6px] rounded-[3px] w-[100%] border-solid border-[1px] border-[#d8d8d8] " name={fe_id} placeholder={placeholder} />
      </div>
    </>
  )
}

export default QuestionInput
