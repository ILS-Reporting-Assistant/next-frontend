import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  accessToken: string
  email: string
  uid: string
  firstName?: string
  lastName?: string
}

const initialState: IUser = {
  accessToken: '',
  email: '',
  uid: '',
}

export const userSlicer = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.accessToken = action.payload.accessToken
      state.email = action.payload.email
      state.uid = action.payload.uid
    },
    logout: (state) => {
      state.accessToken = undefined
      state.email = undefined
      state.uid = undefined
      state.firstName = undefined
      state.lastName = undefined
    },
    userUpdate: (state, action: PayloadAction<Pick<IUser, 'firstName' | 'lastName'>>) => {
      if (action.payload.firstName) state.firstName = action.payload.firstName
      if (action.payload.lastName) state.lastName = action.payload.lastName
    },
  },
})

export const { login, logout, userUpdate } = userSlicer.actions

export default userSlicer.reducer
