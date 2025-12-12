import { ReactQuillProps } from '@app/types'
import dynamic from 'next/dynamic'
import React from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuillComponent = dynamic(() => import('react-quill'), { ssr: false })

export const ReactQuill: React.FC<ReactQuillProps> = (props) => {
  return <ReactQuillComponent {...props} />
}
