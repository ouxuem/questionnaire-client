import React from 'react'

import PageWrapper from '@/components/PageWrapper'

export const metadata = {
  title: '重复提交',
}
const page: React.FC = () => {
  return (
    <PageWrapper>
      <h1>重复提交</h1>
      <p>提交失败，请勿重复提交</p>
    </PageWrapper>
  )
}

export default page

