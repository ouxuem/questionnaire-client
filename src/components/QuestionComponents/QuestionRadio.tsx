import React from 'react'

type QuestionRadioProps = {
  fe_id: string
  props: {
    title: string
    value: string
    isVertical: boolean
    options: Array<{
      text: string
      value: string
    }>
    isRequired: boolean
  }
}
const QuestionRadio: React.FC<QuestionRadioProps> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical, isRequired } = props
  return (
    <>
      <p className="flex items-baseline">
        {isRequired && <span className="text-red-500 mr-1">*</span>}
        <span>{title}</span>
      </p>
      <ul className="list-none p-0">
        {options.map((option) => {
          const { value: val, text } = option

          return (
            <li key={val} className={isVertical ? 'mb-[10px]' : 'mr-[10px] inline-block'}>
              <label>
                <input required={isRequired} type="radio" name={fe_id} value={val} defaultChecked={val === value} />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default QuestionRadio
