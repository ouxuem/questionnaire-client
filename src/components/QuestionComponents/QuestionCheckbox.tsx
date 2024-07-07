'use client'
import React, { useEffect, useRef, useState } from 'react'

type QuestionCheckboxProps = {
  fe_id: string
  props: {
    title: string
    isVertical?: boolean
    list: Array<{
      value: string
      text: string
      checked: boolean
    }>
    isRequired: boolean
  }
}
const QuestionCheckbox: React.FC<QuestionCheckboxProps> = ({ fe_id, props }) => {
  const { title, isVertical, list = [], isRequired } = props
  const [select_values, set_select_values] = useState<string[]>([])
  const checkboxListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item
      if (checked) {
        set_select_values((select_values) => select_values.concat(value))
      }
    })
  }, [list])
  const toggel_checked = (value: string) => {
    // if (select_values.includes(value)) {
    //   set_select_values((select_values) => select_values.filter((v) => v !== value))
    // } else {
    //   set_select_values(select_values.concat(value))
    // }
    let newValues
    if (select_values.includes(value)) {
      newValues = select_values.filter((v) => v !== value)
    } else {
      newValues = select_values.concat(value)
    }
    set_select_values(newValues)
    if (checkboxListRef.current) {
      checkboxListRef.current.style.border = '';
      checkboxListRef.current.style.outline = '';
      checkboxListRef.current.style.backgroundColor = '';
    }
  }
  return (
    <>
      <p className="flex items-baseline">
        {isRequired && <span className="text-red-500 mr-1">*</span>}
        <span>{title}</span>
      </p>
      <input id={`${fe_id}_checkbox`} type="hidden" name={fe_id} value={select_values.toString()} required={isRequired} />
      <ul ref={checkboxListRef} data-checkbox-list={fe_id} id={`${fe_id}_checkbox_list`} className="list-none p-0">
        {list.map((item) => {
          const { value, text } = item
          return (
            <li key={value} className={isVertical ? 'mb-[10px]' : 'mr-[10px] inline-block'}>
              <label>
                <input type="checkbox" checked={select_values.includes(value)} onChange={() => toggel_checked(value)} />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default QuestionCheckbox
