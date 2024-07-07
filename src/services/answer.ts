import { post } from './fetch'

/** 提交答卷 */
export const post_answer = async (question_info: any) => {
  const url = '/api/stat/submitAnswer'
  const data = await post(url, question_info)
  return data
}
