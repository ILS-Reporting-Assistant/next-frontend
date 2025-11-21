import { boxProperties } from '@app/styles'
import { TableProps } from '@app/types'
import { omitCSSProps } from '@app/utils'
import { Table } from 'antd'
import styled from 'styled-components'

export const StyledTable = styled((props: TableProps) => {
  const domProps = omitCSSProps(props)
  return <Table {...domProps} />
})`
  ${boxProperties};
  .ant-pagination-total-text {
    display: flex;
    justify-content: center;
    order: 1;
    width: 100%;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .ant-table-pagination {
    margin-bottom: 0px !important;
    display: flex;
    justify-content: center;
  }
`
