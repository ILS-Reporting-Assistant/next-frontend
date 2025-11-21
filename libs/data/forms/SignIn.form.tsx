/* eslint-disable quotes */
import { EDynamicFormField, IField } from '@app/modules'

import { ROUTE } from '../routes'

export const SIGN_IN_FORM: IField[] = [
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
    inline: [
      {
        align: 'right',
        href: ROUTE.AUTH.FORGOT_PASSWORD,
        name: 'forgotYourPassword',
        placeholder: '',
        rules: [
          {
            required: false,
          },
        ],
        title: 'Forgot Your Password?',
        type: EDynamicFormField.NAVIGATION,
      },
    ],
  },
  {
    name: 'button',
    placeholder: 'Login',
    rules: [
      {
        required: true,
      },
    ],
    title: 'Login',
    type: EDynamicFormField.PRIMARY_BUTTON,
  },
  {
    align: 'center',
    href: ROUTE.AUTH.SIGN_UP,
    name: 'signUpLink',
    rules: [{ required: false }],
    title: "Don't have an account? ",
    linkText: 'Sign up here',
    type: EDynamicFormField.NAVIGATION,
  },
]
