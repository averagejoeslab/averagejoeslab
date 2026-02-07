'use client'

import { useEffect } from 'react'

type Props = {
  formId: string
}

export default function TypeformEmbed({ formId }: Props) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector(
        'script[src="//embed.typeform.com/next/embed.js"]'
      )
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div
      data-tf-live={formId}
      style={{ minHeight: '600px', width: '100%' }}
    ></div>
  )
}
