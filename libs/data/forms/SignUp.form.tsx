import { EDynamicFormField, IField } from '@app/modules'
import { ROUTE } from '../routes'

export const SIGN_UP_FORM: IField[] = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter Email',
    rules: [
      {
        message: 'Email is required',
        required: true,
      },
    ],
    type: EDynamicFormField.EMAIL,
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter Password',
    rules: [
      {
        message: 'Password is required',
        required: true,
      },
    ],
    type: EDynamicFormField.PASSWORD,
  },
  {
    label: 'Re-enter Password',
    name: 'reEnterPassword',
    placeholder: 'Re-enter Password',
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
    placeholder: 'Create Account',
    rules: [
      {
        required: true,
      },
    ],
    title: 'Create Account',
    type: EDynamicFormField.PRIMARY_BUTTON,
  },
  {
    align: 'center',
    href: ROUTE.AUTH.SIGN_IN,
    name: 'forgotYourPassword',
    placeholder: '',
    rules: [
      {
        required: false,
      },
    ],
    title: 'Already have an account? ',
    linkText: 'Login here',
    type: EDynamicFormField.NAVIGATION,
  },
]
