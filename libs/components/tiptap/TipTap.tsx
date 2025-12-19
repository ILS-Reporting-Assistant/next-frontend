import { TipTapProps } from '@app/types'
import dynamic from 'next/dynamic'
import React from 'react'

const TipTapEditorComponent = dynamic(() => import('./TipTapEditor').then((mod) => ({ default: mod.TipTapEditor })), {
  ssr: false,
})

export const TipTap: React.FC<TipTapProps> = (props) => {
  return <TipTapEditorComponent {...props} />
}
