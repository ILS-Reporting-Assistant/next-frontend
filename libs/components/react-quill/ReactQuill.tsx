import { ReactQuillProps } from '@app/types'
import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuillComponent = dynamic(() => import('react-quill'), { ssr: false })

export const ReactQuill: React.FC<ReactQuillProps> = (props) => {
  return <ReactQuillComponent {...props} />
}

