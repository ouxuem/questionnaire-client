import { get } from './fetch'

export const get_question_by_id = async (id: string) => {
  const url = `/api/question/${id}`
  const data = await get(url)
  return data
}
