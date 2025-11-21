import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IColor {
  error?: string
  primary: string
  secondary: string
  white?: string
  background?: string
  grey1?: string
  grey2?: string
  grey3?: string
  grey85?: string
  greyD1?: string
  red4F?: string
}

const initialState = {
  error: '#D8382B',
  primary: '#268AC2',
  secondary: '#D9D9D9',
  white: '#fff',
  background: '#fff',
  grey1: '#00000072',
  grey2: '#E0E6EE',
  grey3: '#f6f6f6',
  grey85: 'rgba(255, 255, 255, 0.85)',
  greyD1: '#d1d1d1',
  red4F: '#FF4D4F',
}

export const colorSlicer = createSlice({
  initialState,
  name: 'color',
  reducers: {
    changeThemeColor: (state, action: PayloadAction<IColor, 'primary' | 'secondary'>) => {
      if (action.payload.primary) state.primary = action.payload.primary
      if (action.payload.secondary) state.secondary = action.payload.secondary
    },
  },
})

export const { changeThemeColor } = colorSlicer.actions

export default colorSlicer.reducer
