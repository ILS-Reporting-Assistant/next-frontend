import { TableProps } from '@app/types'
import { StyledTable } from './elements'

export const Table: React.FC<TableProps> = (props) => {
  return <StyledTable {...props} />
}
