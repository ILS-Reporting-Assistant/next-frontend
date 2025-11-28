import { PageHeader, Select, Space } from '@app/components'
import { maxMobile, maxSmall } from '@app/styles'
import { Any, PageHeaderProps, SelectProps, SpaceProps } from '@app/types'
import styled from 'styled-components'

export const StyledSelect = styled((props: SelectProps<Any>) => <Select {...props} />)`
  && {
    .ant-select-selector {
      background-color: ${(props) => props.theme.color.primary} !important;
      border: ${(props) => props.theme.color.primary};
      color: ${(props) => props.theme.color.white};
      height: 40px;
      padding: 0px 30px;
    }
    .ant-select-arrow {
      color: ${(props) => props.theme.color.white};
      margin-right: 10px;
    }
    .ant-select-selection-item {
      color: ${(props) => props.theme.color.white};
      line-height: 38px;
    }
  }
`

export const StyledPageHeader = styled((props: PageHeaderProps) => <PageHeader {...props} />)`
  background-color: ${(props) => props.theme.color.primary};
  padding: 15px 50px 15px 24px;
  position: sticky;
  top: 0px;
  z-index: 999;

  @media only screen and (max-width: ${maxMobile}) {
    padding: 6px 25px;
  }

  && {
    .ant-page-header-heading-extra {
      align-items: center;
      display: flex;
      @media only screen and (max-width: ${maxMobile}) {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
    .ant-page-header-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media only screen and (max-width: ${maxMobile}) {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
  }
`

export const StyledSpace = styled((props: SpaceProps) => <Space {...props} />)`
  flex-wrap: wrap;
  @media only screen and (max-width: ${maxSmall}) {
    margin-top: 20px;
  }
`

export const StyledNavSpace = styled((props: SpaceProps) => <Space {...props} />)`
  padding-top: 4px;
  @media only screen and (max-width: ${maxSmall}) {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
`
