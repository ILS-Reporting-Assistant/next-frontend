import { Box, Col, Icon, Row, Spacer, Text, Title } from '@app/components'
import React from 'react'
import { Label, StyledBox, StyledButton, StyledText } from './elements'
import { Badge } from 'antd'

export const Dashboard = () => {
  const cardsData = [
    {
      icon: <Icon.FileTextOutlined style={{ fontSize: '24px' }} />,
      title: 'Initial Assessment Report',
      description: 'New client intake and initial service planning.',
      buttonText: 'Create New Report',
    },
    {
      icon: <Icon.LineChartOutlined style={{ fontSize: '24px' }} />,
      title: 'Progress Report',
      description: 'Ongoing service update including growth, goals, and support needs.',
      buttonText: 'Create New Report',
    },
    {
      icon: <Icon.ProfileOutlined style={{ fontSize: '24px' }} />,
      title: 'Annual ISP Review',
      description: 'Comprehensive yearly assessment and planning.',
      buttonText: 'Create New Report',
    },
    {
      icon: <Icon.FormOutlined style={{ fontSize: '24px' }} />,
      title: 'Custom Reports',
      description: 'Flexible reporting for special circumstances.',
      buttonText: 'Create New Report',
      disable: true,
    },
  ]

  const renderCards = (card) => {
    const content = (
      <StyledBox>
        <Row gutter={[0, 0]}>
          <Col span={24} xs={3}>
            <Spacer value={8} />
            {card.icon}
          </Col>
          <Col span={24} xs={21}>
            <Text>{card.title}</Text>
            <Spacer value={1} />
            <Label>{card.description}</Label>
            <Spacer value={24} />
          </Col>
          <StyledButton disabled={card?.disable}>{card.buttonText}</StyledButton>
        </Row>
      </StyledBox>
    )

    if (card?.disable) {
      return (
        <Badge.Ribbon
          text={
            <Text color="#313C77">
              <Icon.NotificationOutlined style={{ color: '#313C77' }} /> Coming Soon
            </Text>
          }
          color="#C4D8FF"
          placement="start"
        >
          {content}
        </Badge.Ribbon>
      )
    }

    return content
  }

  return (
    <Box>
      <Title level={1}>Welcome, John!</Title>
      <StyledText>What kind of report are we working on today?</StyledText>
      <Spacer value={8} />
      <Label>Select the type of ILS report you’d like to create.</Label>
      <Spacer value={24} />
      <Row gutter={[16, 16]}>
        {cardsData.map((card, index) => (
          <Col key={index} span={24} lg={12} xs={24}>
            {renderCards(card)}
          </Col>
        ))}
      </Row>
    </Box>
  )
}
