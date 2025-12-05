import { EDynamicFormField, IField } from '@app/modules'
import { Rule } from 'antd/es/form'
import { ROUTE } from '../routes'

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

export const SIGN_UP_FORM: IField[] = [
  {
    align: 'center',
    href: ROUTE.AUTH.SIGN_IN,
    name: 'signUpLink',
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
  {
    label: 'Organization Name*',
    name: 'orgName',
    placeholder: 'Enter organization name',
    rules: [
      {
        message: 'Please enter organization name',
        required: true,
      },
    ],
    type: EDynamicFormField.INPUT,
    hidden: true, // Will be shown conditionally based on account type
  },
  {
    label: 'First Name*',
    name: 'firstName',
    placeholder: 'Enter first name',
    rules: [
      {
        message: 'Please enter first name',
        required: true,
      },
    ],
    type: EDynamicFormField.INPUT,
  },
  {
    label: 'Last Name*',
    name: 'lastName',
    placeholder: 'Enter last name',
    rules: [
      {
        message: 'Please enter last name',
        required: true,
      },
    ],
    type: EDynamicFormField.INPUT,
  },
  {
    label: 'Email*',
    name: 'email',
    placeholder: 'Enter email',
    rules: [
      {
        message: 'Please enter email',
        required: true,
      },
      {
        message: 'Please enter a valid email',
        type: 'email',
      },
    ],
    type: EDynamicFormField.EMAIL,
  },
  {
    label: 'Address',
    name: 'address',
    placeholder: 'Enter address',
    rules: [
      {
        required: false,
      },
    ],
    type: EDynamicFormField.INPUT,
    hidden: true, // Will be shown conditionally based on account type
  },
  {
    label: 'Password*',
    name: 'password',
    placeholder: 'Enter password',
    rules: [
      {
        message: 'Please enter password',
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
    placeholder: 'Confirm password',
    rules: confirmPasswordRules,
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
]
