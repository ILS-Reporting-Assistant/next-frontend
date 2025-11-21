import { FormItem, Link, Text } from '@app/components'

import { DynamicInputProps } from '../../types'

export const DFNavigation: React.FC<DynamicInputProps> = ({ field }) => {
  const hasPrefix = Boolean(field.title && field.linkText)
  const linkLabel = field.linkText || field.title
  return (
    <FormItem>
      {hasPrefix && <Text>{field.title}</Text>}
      <Link href={field.href}>{linkLabel}</Link>
    </FormItem>
  )
}
