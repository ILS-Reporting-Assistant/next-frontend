import { EDynamicFormField, IField } from '@app/modules'
import { Rule } from 'antd/es/form'

const passwordRules: Rule[] = [
  { required: true, message: 'Please enter password' },
  { min: 8, message: 'Password must be at least 8 characters' },
  {
    pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
    message: 'Password must contain at least one letter and one number',
  },
]

const confirmPasswordRules: Rule[] = [
  { required: true, message: 'Please confirm password' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('The two passwords do not match!'))
    },
  }),
]

export const INVITATION_FORM: IField[] = [
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter password',
    rules: passwordRules,
    type: EDynamicFormField.PASSWORD,
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Confirm password',
    rules: confirmPasswordRules,
    type: EDynamicFormField.PASSWORD,
  },
  {
    name: 'button',
    placeholder: 'Complete Invitation',
    rules: [
      {
        required: true,
      },
    ],
    title: 'Complete Invitation',
    type: EDynamicFormField.PRIMARY_BUTTON,
  },
]

