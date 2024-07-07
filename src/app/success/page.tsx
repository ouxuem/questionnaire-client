import React from 'react'
import PageWrapper from '@/components/PageWrapper'

export const metadata = {
  title: '提交成功',
}
const page: React.FC = () => {
  return (
    <PageWrapper>
      <h1>成功</h1>
      <p>问卷提交成功，感谢您的参与！</p>
    </PageWrapper>
  )
}

export default page
