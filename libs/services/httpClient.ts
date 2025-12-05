import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { store, logout, refreshTokens as refreshTokensAction } from '@app/redux'
import { AuthRequestConfig, RefreshResponse } from '@app/types'
import { ENDPOINT } from '@app/data'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5002'

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshPromise: Promise<RefreshResponse['data'] | null> | null = null

const performTokenRefresh = async (): Promise<RefreshResponse['data'] | null> => {
  const {
    user: { refreshToken },
  } = store.getState()

  if (!refreshToken) {
    return null
  }

  const { data } = await httpClient.post<RefreshResponse>(ENDPOINT.AUTH.REFRESH, { refreshToken }, {
    skipAuthRefresh: true,
  } as AxiosRequestConfig)
  store.dispatch(
    refreshTokensAction({
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    }),
  )

  httpClient.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`

  return data.data
}

httpClient.interceptors.request.use((config) => {
  const authConfig = config as AuthRequestConfig

  if (authConfig.skipAuthRefresh) {
    return authConfig
  }

  // If data is FormData, remove Content-Type to let axios set it automatically with boundary
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete (config.headers as any)['Content-Type']
    }
  }

  const {
    user: { accessToken },
  } = store.getState()

  if (accessToken) {
    const headers = (authConfig.headers ?? {}) as Record<string, string>
    headers.Authorization = `Bearer ${accessToken}`
    authConfig.headers = headers
  }

  return authConfig
})

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error
    const authConfig = config as AuthRequestConfig | undefined

    if (!authConfig || authConfig.skipAuthRefresh) {
      return Promise.reject(error)
    }

    if (response?.status === 401) {
      if (authConfig._retry) {
        store.dispatch(logout())
        delete httpClient.defaults.headers.common.Authorization
        return Promise.reject(error)
      }

      authConfig._retry = true

      try {
        refreshPromise = refreshPromise ?? performTokenRefresh()
        const tokens = await refreshPromise
        refreshPromise = null

        if (!tokens) {
          store.dispatch(logout())
          delete httpClient.defaults.headers.common.Authorization
          return Promise.reject(error)
        }

        const headers = (authConfig.headers ?? {}) as Record<string, string>
        headers.Authorization = `Bearer ${tokens.accessToken}`
        authConfig.headers = headers

        return httpClient(authConfig)
      } catch (refreshError) {
        refreshPromise = null
        store.dispatch(logout())
        delete httpClient.defaults.headers.common.Authorization
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export { httpClient }
