import React from 'react'
import { Spin as AntSpin } from 'antd'
import { SpinProps } from '@app/types'

export const Spin: React.FC<SpinProps> = (props) => {
  return <AntSpin {...props} />
}
