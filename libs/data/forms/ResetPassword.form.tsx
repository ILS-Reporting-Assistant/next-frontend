import { EDynamicFormField, IField } from '@app/modules'
import { Rule } from 'antd-v4/lib/form'

const confirmPasswordRules: Rule[] = [
  {
    message: 'Please confirm your password',
    required: true,
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Passwords do not match'))
    },
  }),
]

export const RESET_PASSWORD_FORM: IField[] = [
  {
    label: 'New Password*',
    name: 'password',
    placeholder: 'Enter New Password',
    rules: [
      {
        message: 'Password is required',
        required: true,
      },
      {
        message: 'Password must be at least 8 characters',
        min: 8,
      },
      {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      },
    ],
    type: EDynamicFormField.PASSWORD,
  },
  {
    label: 'Confirm Password*',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    rules: confirmPasswordRules,
    type: EDynamicFormField.PASSWORD,
  },
  {
    name: 'button',
    placeholder: 'Save New Password',
    rules: [
      {
        required: true,
      },
    ],
    title: 'Save New Password',
    type: EDynamicFormField.PRIMARY_BUTTON,
  },
]
