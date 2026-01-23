import { Container, Text } from '@app/components'
import { ContainerProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledFlexContainer = styled((props: ContainerProps) => <Container {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 60vh;
  width: 100%;
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  max-width: 400px;
`
