import QuestionInput from './QuestionInput'
import QuestionRadio from './QuestionRadio'
import QuestionTitle from './QuestionTitle'
import QuestionParagraph from './QuestionParagraph'
import QuestionInfo from './QuestionInfo'
import QuestionTextArea from './QuestionTextArea'
import QuestionCheckbox from './QuestionCheckbox'
type component_info_type = {
  fe_id: string
  type: string
  // title: string,
  isHidden: boolean
  props: any
}

export const get_component = (component: component_info_type) => {
  const { type, props = {}, fe_id, isHidden } = component

  if (isHidden) return null

  if (type === 'questionInput') {
    return <QuestionInput fe_id={fe_id} props={props} />
  }

  if (type === 'questionRadio') {
    return <QuestionRadio fe_id={fe_id} props={props} />
  }

  if (type === 'questionTitle') {
    return <QuestionTitle {...props} />
  }

  if (type === 'questionParagraph') {
    return <QuestionParagraph {...props} />
  }

  if (type === 'questionInfo') {
    return <QuestionInfo {...props} />
  }

  if (type === 'questionTextArea') {
    return <QuestionTextArea fe_id={fe_id} props={props} />
  }

  if (type === 'questionCheckbox') {
    return <QuestionCheckbox fe_id={fe_id} props={props} />
  }

  return null
}
