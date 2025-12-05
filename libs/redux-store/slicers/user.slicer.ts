import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IUser, RefreshTokensPayload } from '@app/types'
import { UserRole } from '../../enums'

const initialState: IUser = {
  accessToken: '',
  refreshToken: '',
  email: '',
  uid: '',
  firstName: '',
  lastName: '',
  role: '',
  type: '',
  emailVerifiedAt: null,
  currentOrganizationId: '',
}

export const userSlicer = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.accessToken = action.payload.accessToken
      state.email = action.payload.email
      state.uid = action.payload.uid
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.role = action.payload.role
      state.type = action.payload.type
      state.emailVerifiedAt = action.payload.emailVerifiedAt
    },
    logout: (state) => {
      state.accessToken = undefined
      state.email = undefined
      state.uid = undefined
      state.firstName = undefined
      state.lastName = undefined
      state.role = undefined
      state.type = undefined
      state.emailVerifiedAt = undefined
    },
    userUpdate: (state, action: PayloadAction<Pick<IUser, 'firstName' | 'lastName'>>) => {
      if (action.payload.firstName) state.firstName = action.payload.firstName
      if (action.payload.lastName) state.lastName = action.payload.lastName
    },
    refreshTokens: (state, action: PayloadAction<RefreshTokensPayload>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setCurrentOrganization: (state, action: PayloadAction<{ organizationId: string; role?: UserRole | string }>) => {
      state.currentOrganizationId = action.payload.organizationId
      if (action.payload.role) {
        state.currentOrganizationRole = action.payload.role
      }
    },
  },
})

export const { login, logout, userUpdate, refreshTokens, setCurrentOrganization } = userSlicer.actions

export default userSlicer.reducer
