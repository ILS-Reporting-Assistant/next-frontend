import { EDynamicFormField, IField } from '@app/modules'

export const ADD_CLIENT_FORM: IField[] = [
  {
    label: 'First Name*',
    name: 'firstName',
    placeholder: 'Enter first name',
    rules: [
      {
        required: true,
        message: 'Please enter first name',
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
        required: true,
        message: 'Please enter last name',
      },
    ],
    type: EDynamicFormField.INPUT,
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter email (optional)',
    rules: [
      {
        type: 'email',
        message: 'Please enter a valid email',
      },
    ],
    type: EDynamicFormField.EMAIL,
  },
  {
    label: 'Start Date',
    name: 'startDate',
    placeholder: 'Select start date',
    rules: [],
    type: EDynamicFormField.DATE,
  },
  {
    label: 'End Date',
    name: 'endDate',
    placeholder: 'Select end date',
    rules: [],
    type: EDynamicFormField.DATE,
  },
]

