'use client'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
// import Head from 'next/head'
import { Metadata } from 'next'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
type PageWrapperProps = {
  children: JSX.Element | JSX.Element[]
  css?: string
  js?: string
}

export const metadata: Metadata = {
  icons: {
    icon: '../app/icon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, css, js }) => {
  const [fingerprint, setFingerprint] = useState('')
  useEffect(() => {
    async function generateFingerprint() {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      setFingerprint(result.visitorId)
    }
    generateFingerprint()
  }, [])
  useEffect(() => {
    const handleSubmit = (event: any) => {
      event.preventDefault()
      const form = event.target

      const fingerprintInput = form.querySelector('input[name="fingerprint"]')
      if (fingerprintInput) {
        fingerprintInput.value = fingerprint
      }
      const requiredInputs = form.querySelectorAll('input[required], textarea[required]')
      let isValid = true

      requiredInputs.forEach((input: any) => {
        if (input.type === 'hidden' && input.id.endsWith('_checkbox')) {
          if (!input.value) {
            isValid = false
            const checkboxList = document.querySelector(`[data-checkbox-list="${input.id.replace('_checkbox', '')}"]`) as HTMLUListElement
            if (checkboxList) {
              checkboxList.style.border = '1px solid red'
              checkboxList.style.outline = '1px solid red'
              checkboxList.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'
            }
          }
        } else if (!input.value.trim()) {
          isValid = false
          input.classList.add('error')
        } else {
          input.classList.remove('error')
        }
      })

      if (isValid) {
        form.submit()
      } else {
        alert('请填写所有必填项')
      }
    }

    const form = document.getElementById('surveyForm')
    if (form) {
      form.addEventListener('submit', handleSubmit)
    }

    // 清理函数
    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit)
      }
    }
  }, [fingerprint])

  return (
    <>
      {/* <Head>
        <style>{css}</style>
      </Head> */}
      <main className="max-w-[500px] mx-auto">{children}</main>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <style
        dangerouslySetInnerHTML={{
          __html: `
    #surveyForm input.error, 
    #surveyForm textarea.error, 
    #surveyForm ul.error {
      border-color: red !important;
    }
  `,
        }}
      />
      <Script id="page-js">{js}</Script>
    </>
  )
}

export default PageWrapper
