export const dynamic = 'force-dynamic'
import React from 'react'
import PageWrapper from '@/components/PageWrapper'
import { get_question_by_id } from '@/services/question'
import { get_component } from '@/components/QuestionComponents'

type QuestionData = {
  id: string
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished: boolean
  isDeleted: boolean
  componentList: Array<any>
}

async function getQuestionData(id: string): Promise<{
  code: number
  data?: QuestionData
  msg?: string
}> {
  return await get_question_by_id(id)
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data, code } = await getQuestionData(params.id)
  const { title = '', desc = '', isDeleted, isPublished } = data || {}
  if (code !== 0) {
    return {
      title: '错误',
      description: desc || '获取问卷失败',
    }
  }
  if (isDeleted) {
    return {
      title: title || '问卷已删除',
      description: desc || '问卷已删除',
    }
  }
  if (!isPublished) {
    return {
      title: title || '问卷未发布',
      description: desc || '问卷未发布',
    }
  }
  return {
    title: title || '问卷页面',
    description: desc || '问卷描述',
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { code, data, msg = '' } = await getQuestionData(params.id)
  const { isDeleted, isPublished, title, componentList = [], css, js, id } = data || {}

  if (code !== 0) {
    return (
      <PageWrapper>
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    )
  }
  if (isDeleted) {
    return (
      <PageWrapper>
        <h1>{title}</h1>
        <p>该问卷已被删除</p>
      </PageWrapper>
    )
  }
  if (!isPublished) {
    return (
      <PageWrapper>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    )
  }

  const components_list_element = (
    <>
      {componentList.map((item) => {
        const component_element = get_component(item)
        return (
          <div key={item.fe_id} className="border-b-solid border-b-[1px] border-b-[#f1f1f1]">
            {component_element}
          </div>
        )
      })}
    </>
  )
  return (
    <PageWrapper css={css} js={js}>
      <form id="surveyForm" method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={id} />
        <input type="hidden" name="fingerprint" />
        {components_list_element}
        <div className="text-center m-[16px]">
          <button className="rounded-[3px] px-[15px] py-[4px] border-solid border-[1px] border-[transparent] text-[#fff] bg-[#1677ff]" type="submit">
            提交
          </button>
        </div>
      </form>
    </PageWrapper>
  )
}
