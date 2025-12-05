import { AxiosRequestConfig } from 'axios'

export type AuthRequestConfig = AxiosRequestConfig & {
  skipAuthRefresh?: boolean
  _retry?: boolean
}

export type RefreshResponse = {
  data: {
    accessToken: string
    refreshToken: string
  }
}
