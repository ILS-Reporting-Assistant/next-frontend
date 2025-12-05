import { Col, Row, Space } from '@app/components'
import { ColProps, RowProps, SpaceProps } from '@app/types'
import styled from 'styled-components'

export const StyledCol = styled((props: ColProps) => <Col {...props} />)`
  text-align: ${(props) => props.textAlign ?? 'left'};
  width: 100%;
`

export const StyledRow = styled((props: RowProps) => <Row {...props} />)`
  margin-bottom: 0 !important;
`

export const StyledSpace = styled((props: SpaceProps) => <Space {...props} />)`
  width: 100%;
`
