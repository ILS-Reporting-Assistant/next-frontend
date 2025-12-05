import 'antd/dist/reset.css'

import { App, Content, Icon, If, Layout, Sider, SiderMenu, Tooltip } from '@app/components'
import { ROUTE } from '@app/data'
import { changeDynamicTheme, IStore, logout, persistor, store } from '@app/redux'
import { GlobalStyles } from '@app/styles'
import { getThemeColors, THEME } from '@app/theme'
import { ConfigProvider } from 'antd'
import { StyledBanner } from 'libs/components/layout/elements'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AppFonts } from 'public'
import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { NavBar, SIDEBAR_MENU_ITEMS } from '~collections'

export default function Root(props: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyles />
        <AppFonts />
        <Main {...props} />
      </PersistGate>
    </Provider>
  )
}

function Main({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { theme, trigger, user } = useSelector((state: IStore) => state)
  const COLORS = getThemeColors(theme.value)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const route = router.route

  useEffect(() => {
    authenticateUser()
  }, [user, route])

  const authenticateUser = () => {
    if (user.uid) {
      if (route === ROUTE.AUTH.SIGN_IN) {
        router.replace(ROUTE.DASHBOARD)
      }
      if (route === ROUTE.AUTH.SIGN_UP) {
        router.replace(ROUTE.AUTH.VERIFY_ACCOUNT)
      }
    } else {
      dispatch(logout())
      if (!isAuthScreen()) router.replace(ROUTE.ROOT)
    }
  }

  const isAuthScreen = () => {
    return [
      ROUTE.AUTH.SIGN_IN,
      ROUTE.AUTH.SIGN_UP,
      ROUTE.AUTH.FORGOT_PASSWORD,
      ROUTE.AUTH.VERIFY_ACCOUNT,
      ROUTE.AUTH.INVITATION,
      ROUTE.ONBOARDING,
      ROUTE.AUTH.RESET_PASSWORD,
    ].includes(route)
  }

  const isSidebarVisible = () => {
    return ![
      ROUTE.AUTH.SIGN_IN,
      ROUTE.AUTH.SIGN_UP,
      ROUTE.AUTH.FORGOT_PASSWORD,
      ROUTE.AUTH.RESET_PASSWORD,
      ROUTE.AUTH.VERIFY_ACCOUNT,
      ROUTE.AUTH.INVITATION,
      ROUTE.ONBOARDING,
      ROUTE.ROOT,
    ].includes(route)
  }

  const backgroundColor = { background: COLORS.primary }

  const updateSidebar = (value) => {
    setIsCollapsed(value)
    dispatch(
      changeDynamicTheme({
        ...theme.dynamicTheme,
        isCollapsed: value,
      }),
    )
  }

  return (
    <ConfigProvider theme={THEME(theme.value, theme.dynamicTheme.isCompact)}>
      <App>
        <ThemeProvider
          theme={{
            color: COLORS,
            mode: theme.value,
            isCollapsed: theme.dynamicTheme.isCollapsed,
          }}
        >
          <Layout>
            <If condition={!isAuthScreen()}>
              <>
                <If condition={trigger.showBanner}>
                  <StyledBanner
                    message="Want to fix collaboration at your company? Here`s what 9,615 people have to say."
                    closeIcon={<Icon.CloseOutlined style={{ color: COLORS.white }} />}
                    closable
                  />
                </If>
                <NavBar />
              </>
            </If>
            {/* Layout without sidebar ====================== */}
            <If condition={!isSidebarVisible()}>
              <Content height="100vh" padding="0">
                <Component {...pageProps} />
              </Content>
            </If>

            {/* Layout with sidebar ====================== */}
            <If condition={isSidebarVisible()}>
              <Layout hasSider>
                <Sider
                  className="sidebar-layout sider-scrollbar-styling"
                  breakpoint="lg"
                  width="250px"
                  style={{ ...backgroundColor }}
                  theme={'dark'}
                  collapsible={route === '/chat' ? false : true}
                  onCollapse={(value) => updateSidebar(value)}
                  trigger={
                    <>
                      {isCollapsed ? (
                        <Tooltip title={'Open Navigation'} placement="right">
                          <Icon.RightSquareOutlined />
                        </Tooltip>
                      ) : (
                        <Tooltip title={'Collapse Navigation'} placement="right">
                          <Icon.LeftSquareOutlined />
                        </Tooltip>
                      )}
                    </>
                  }
                  collapsed={isCollapsed}
                >
                  <SiderMenu
                    selectedKeys={[router.route.slice(1)]}
                    theme={'dark'}
                    mode={'inline'}
                    defaultSelectedKeys={[router.route.slice(1)]}
                    items={SIDEBAR_MENU_ITEMS()}
                    style={{ ...backgroundColor, paddingBottom: '110px' }}
                  />
                </Sider>
                <Layout>
                  <Content header sidebar>
                    <Component {...pageProps} />
                  </Content>
                </Layout>
              </Layout>
            </If>
          </Layout>
        </ThemeProvider>
      </App>
    </ConfigProvider>
  )
}
