import { FlexContainer, Input, Select, Tag } from '@app/components'
import { FlexContainerProps, InputProps, SelectProps, TagProps } from '@app/types'
import styled from 'styled-components'

export const StyledFlexContainer = styled((props: FlexContainerProps) => <FlexContainer {...props} />)`
  justify-content: space-between;
  text-align: center;
  align-items: end;
`

export const StyledSearch = styled((props: InputProps) => <Input {...props} />)`
  max-width: 450px;
  height: 40px;
`
export const StyledFilter = styled((props: SelectProps<any>) => <Select {...props} />)`
  margin-left: 8px;
  height: 40px;
`

export const StyledActiveTag = styled((props: TagProps) => <Tag {...props} />)`
  background: #bad7ab !important;
  color: #477e2c !important;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #9bd280 !important;
  display: inline-flex;
  align-items: center;

  &.ant-tag {
    margin: 0;
    line-height: 22px;
  }
`

export const StyledInactiveTag = styled((props: TagProps) => <Tag {...props} />)`
  background: #eaeaea !important;
  color: #7e7e7e !important;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #d0d0d0 !important;
  display: inline-flex;
  align-items: center;

  &.ant-tag {
    margin: 0;
    line-height: 22px;
  }
`

export const StyledPendingTag = styled((props: TagProps) => <Tag {...props} />)`
  background: #fbf6ea !important;
  color: #d7a012 !important;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #f0d89c !important;
  display: inline-flex;
  align-items: center;

  &.ant-tag {
    margin: 0;
    line-height: 22px;
  }
`

export const StyledFormInput = styled((props: InputProps) => <Input {...props} />)`
  &&.ant-input {
    height: 40px !important;
  }
  height: 40px !important;
`

export const StyledFormSelect = styled((props: SelectProps<any>) => <Select {...props} />)`
  && {
    .ant-select-selector {
      height: 40px !important;

      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        line-height: 38px !important;
        height: 40px !important;
      }
    }
  }
  .ant-select-selection-placeholder {
    line-height: 38px !important;
    height: 40px !important;
  }
`
