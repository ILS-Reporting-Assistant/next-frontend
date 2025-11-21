import {
  FormInstance as AntFormInstance,
  FormItemProps as AntFormItemProps,
  FormListProps as AntFormListProps,
  FormProps as AntFormProps,
} from 'antd/lib/form'

export interface FormProps extends AntFormProps {
  children?: React.ReactNode
}

export type FormItemProps = AntFormItemProps
export type FormListProps = AntFormListProps
export type FormInstance = AntFormInstance
