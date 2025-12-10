import { Box, Col, Icon, Row, Spacer } from '@app/components'
import { DashboardCardData } from '@app/types'
import {
  Label,
  StyledBox,
  StyledButton,
  StyledButtonWrapper,
  StyledCardContent,
  StyledCardIcon,
  StyledCardText,
  StyledRibbon,
  StyledRibbonIcon,
  StyledRibbonText,
  StyledRow,
  StyledText,
  StyledWelcomeTitle,
} from './elements'
import { useRouter } from 'next/router'

export const Dashboard = () => {
  const router = useRouter()
  const cardsData: DashboardCardData[] = [
    {
      icon: (
        <StyledCardIcon>
          <Icon.FileTextOutlined />
        </StyledCardIcon>
      ),
      title: 'Initial Assessment Report',
      description: 'New client intake and initial service planning.',
      buttonText: 'Create New Report',
      buttonClick: '/assessment-reports',
    },
    {
      icon: (
        <StyledCardIcon>
          <Icon.LineChartOutlined />
        </StyledCardIcon>
      ),
      title: 'Progress Report',
      description: 'Ongoing service update including growth, goals, and support needs.',
      buttonText: 'Create New Report',
      buttonClick: '/progress-reports',
    },
    {
      icon: (
        <StyledCardIcon>
          <Icon.ProfileOutlined />
        </StyledCardIcon>
      ),
      title: 'Annual ISP Review',
      description: 'Comprehensive yearly assessment and planning.',
      buttonText: 'Create New Report',
      buttonClick: '/isp-reviews',
    },
    {
      icon: (
        <StyledCardIcon>
          <Icon.FormOutlined />
        </StyledCardIcon>
      ),
      title: 'Custom Reports',
      description: 'Flexible reporting for special circumstances.',
      buttonText: 'Create New Report',
      disable: true,
      buttonClick: '',
    },
  ]

  const renderCards = (card) => {
    const content = (
      <StyledBox disabled={card?.disable}>
        <Row gutter={[16, 0]}>
          <Col span={3} xs={3}>
            {card.icon}
          </Col>
          <Col span={21} xs={21}>
            <StyledCardContent>
              <StyledCardText>{card.title}</StyledCardText>
              <Label>{card.description}</Label>
            </StyledCardContent>
            <StyledButtonWrapper>
              <StyledButton disabled={card?.disable} onClick={() => router.push(card?.buttonClick)}>
                {card.buttonText}
              </StyledButton>
            </StyledButtonWrapper>
          </Col>
        </Row>
      </StyledBox>
    )

    if (card?.disable) {
      return (
        <StyledRibbon
          text={
            <StyledRibbonText>
              <StyledRibbonIcon>
                <Icon.NotificationOutlined />
              </StyledRibbonIcon>
              Coming Soon!
            </StyledRibbonText>
          }
          color="#C4D8FF"
          placement="start"
        >
          {content}
        </StyledRibbon>
      )
    }

    return content
  }

  return (
    <Box>
      <StyledWelcomeTitle level={1}>Welcome, John!</StyledWelcomeTitle>
      <StyledText>What kind of report are we working on today?</StyledText>
      <Spacer value={8} />
      <Spacer value={24} />
      <StyledRow gutter={[16, 16]}>
        {cardsData.map((card, index) => (
          <Col key={index} span={24} lg={12} xs={24}>
            {renderCards(card)}
          </Col>
        ))}
      </StyledRow>
    </Box>
  )
}
