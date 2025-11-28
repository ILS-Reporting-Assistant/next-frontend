import { EDynamicFormField, IField } from '@app/modules'

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
    ],
    type: EDynamicFormField.PASSWORD,
  },
  {
    label: 'Confirm Password*',
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    rules: [
      {
        message: 'Confirm Password is required',
        required: true,
      },
    ],
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
