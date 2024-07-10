// import { post_answer } from '@/services/answer'
// import { NextResponse, NextRequest } from 'next/server'

// const generate_answer_info = (reqBody: any) => {
//   const answerList: Array<{ componentId: string; value: string }> = []

//   Object.keys(reqBody).forEach((key) => {
//     if (key === 'questionId') return
//     answerList.push({
//       componentId: key,
//       value: reqBody[key],
//     })
//   })
//   return {
//     questionId: reqBody.questionId || '',
//     answerList,
//   }
// }

// export async function POST(request: NextRequest) {
//   const answer_info = generate_answer_info(request.body)

//   try {
//     const res_data = await post_answer(answer_info)
//     if (res_data.code === 200) {
//       return NextResponse.redirect(new URL('/success', request.url))
//     } else {
//       return NextResponse.redirect(new URL('/fail', request.url))
//     }
//   } catch (error) {
//     return NextResponse.redirect(new URL('/fail', request.url))
//   }
// }

import { post_answer } from '@/services/answer'
import { NextResponse, NextRequest } from 'next/server'

// 生成答案
const generate_answer_info = (formData: FormData) => {
  const answerList: Array<{ fe_id: string; value: string }> = []

  Array.from(formData.entries()).forEach(([key, value]) => {
    if (key === 'questionId' || key === 'fingerprint') return
    answerList.push({
      fe_id: key,
      value: value.toString(),
    })
  })

  return {
    questionId: formData.get('questionId')?.toString() || '',
    answerList,
    fingerprint: formData.get('fingerprint')?.toString() || '',
  }
}

export async function POST(request: NextRequest) {
  try {
    // 解析表单数据
    const formData = await request.formData()

    const answer_info = generate_answer_info(formData)

    const res_data = await post_answer(answer_info)

    if (res_data.code === 0) {
      return NextResponse.redirect(new URL('/success', request.url))
    } else if (res_data.code === 404) {
      return NextResponse.redirect(new URL('/repeat', request.url))
    } else {
      return NextResponse.redirect(new URL('/fail', request.url))
    }
  } catch (error) {
    console.error('Error processing form:', error)
    return NextResponse.redirect(new URL('/fail', request.url))
  }
}
