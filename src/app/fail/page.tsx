import React from 'react'

import PageWrapper from '@/components/PageWrapper'

export const metadata = {
  title: '提交失败',
}
const page: React.FC = () => {
  return (
    <PageWrapper>
      <h1>失败</h1>
      <p>提交失败，请稍后再试</p>
    </PageWrapper>
  )
}

export default page

