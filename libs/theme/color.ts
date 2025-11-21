import { IStore } from '@app/redux'
import { useSelector } from 'react-redux'

import { ETheme } from './enums'

export const BASE_COLORS = {
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

const DARK_MODE_COLORS = {
  background: '#121212',
  grey1: '#cdcdcd',
  grey2: '#cdcdcd',
  grey3: '#2d2d2d',
  grey85: 'rgba(40, 40, 40, 0.85)',
  greyD1: '#4a4a4a',
  red4F: '#FF6666',
}

export const getThemeColors = (theme?: ETheme) => {
  const { color } = useSelector((state: IStore) => state)
  switch (theme) {
    case ETheme.LIGHT: {
      return {
        ...color,
      }
    }
    case ETheme.DARK: {
      return {
        ...color,
        ...DARK_MODE_COLORS,
      }
    }
    default: {
      return {
        ...color,
      }
    }
  }
}
