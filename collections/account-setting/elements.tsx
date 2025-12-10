import { Box, Tabs, Text } from '@app/components'
import { maxMobile } from '@app/styles'
import { BoxProps, TabsProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledTabLabel = styled((props: BoxProps) => <Box {...props} />)``

export const StyledContainer = styled((props: BoxProps) => <Box {...props} />)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 15px;
`

export const StyledTitle = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: 0 !important;
  font-weight: 500;
  font-size: 28px;
`

export const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)`
  .ant-tabs-nav {
    margin-bottom: 38px;
  }

  .ant-tabs-tab {
    font-size: 16px;
    padding: 16px 0px;
    color: #7e7e7e;

    &:last-child {
      margin-right: 0;
    }
  }

  .ant-tabs-tab-btn {
    display: flex;
    align-items: center;
    color: inherit;
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #000000;
    }
  }

  .ant-tabs-ink-bar {
    background: #000000;
  }

  .ant-tabs-nav::before {
    border-bottom-color: #dddddd;
  }

  @media only screen and (max-width: ${maxMobile}) {
    .ant-tabs-tab {
      font-size: 14px;
      padding: 12px 0px;
      margin-right: 16px;
    }
  }
`
