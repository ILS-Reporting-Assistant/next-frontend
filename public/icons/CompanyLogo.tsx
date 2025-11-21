import { Image } from '@app/components'
import React from 'react'

export const CompanyLogo: React.FC<{ height?: number; width?: number }> = ({ height = 50, width }) => {
  return <Image preview={false} src="../images/logo.svg" style={{ height, width }} />
}
