import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Col, Icon, Row, Space, Switch, Tag, Tooltip } from '@app/components'
import { IStore, toggleTheme } from '@app/redux'
import { ETheme } from '@app/theme'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledNavSpace, StyledPageHeader, StyledSpace } from './elements'
import { ProfileMenu } from './profile-menu'
import { useRouter } from 'next/router'
import { ROUTE } from '@app/data'
import { CompanyLogo } from '~public'

export const NavBar = () => {
  const { color, theme, user } = useSelector((state: IStore) => state)
  const dispatch = useDispatch()
  const [changeThemeDrawerVisible, setChangeThemeDrawerVisible] = useState(false)

  const toggleThemeDrawer = () => {
    setChangeThemeDrawerVisible(!changeThemeDrawerVisible)
  }

  const router = useRouter()
  const getHelpTooltipTitle = () => {
    return (
      <Space direction="vertical" padding="10px">
        <Tag color={color.secondary} icon={<ExclamationCircleOutlined />}>
          Update
        </Tag>
        User can switch to light or dark mode using this toggle button.
      </Space>
    )
  }

  const companyTitle = (
    <StyledNavSpace size={'large'}>
      <CompanyLogo height={50} />
    </StyledNavSpace>
  )

  return (
    <>
      <StyledPageHeader
        isNavbar
        title={companyTitle}
        extra={
          <Row justify={'end'}>
            <Col span={24}>
              <StyledSpace size="large">
                {/* <Tooltip title={getHelpTooltipTitle()} color={color.primary}>
                  <Switch
                    checkedChildren={<Icon.MoonOutlined />}
                    unCheckedChildren={<Icon.SunOutlined />}
                    checked={theme.value === ETheme.DARK}
                    onChange={() => dispatch(toggleTheme())}
                  />
                </Tooltip> */}
                {user?.email ? (
                  <ProfileMenu />
                ) : (
                  <Button size="small" type="default" onClick={() => router.replace(ROUTE.AUTH.SIGN_IN)}>
                    Log In
                  </Button>
                )}
              </StyledSpace>
            </Col>
          </Row>
        }
      />
    </>
  )
}
