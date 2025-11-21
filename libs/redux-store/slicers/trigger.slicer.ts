import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface ITrigger {
  showBadge?: boolean
  showBanner?: boolean
}

const initialState = {
  showBanner: false,
  showBadge: false,
}

export const triggerSlicer = createSlice({
  initialState,
  name: 'trigger',
  reducers: {
    toggleBanner: (state, action: PayloadAction<ITrigger>) => {
      if (action.payload.showBanner !== undefined) state.showBanner = action.payload.showBanner
    },
    toggleBadge: (state, action: PayloadAction<ITrigger>) => {
      if (action.payload.showBadge !== undefined) state.showBadge = action.payload.showBadge
    },
  },
})

export const { toggleBanner, toggleBadge } = triggerSlicer.actions

export default triggerSlicer.reducer
