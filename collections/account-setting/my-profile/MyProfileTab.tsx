import { DeleteOutlined } from '@ant-design/icons'
import {
  Box,
  Col,
  Form,
  Input,
  Notification,
  Row,
  Spacer,
  useForm
} from '@app/components'
import { IStore } from '@app/redux'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  StyledAccountDeletionSection,
  StyledButtonGroup,
  StyledCancelButton,
  StyledDeleteAccountContent,
  StyledDeleteAccountDescription,
  StyledDeleteAccountTitle,
  StyledDeleteButton,
  StyledFormItem,
  StyledPageHeader,
  StyledProfileSection,
  StyledSaveButton,
} from './elements'
import { StyledTabContent, StyledSectionTitle, StyledSectionSubTitle, StyledDivider } from '../shared'

export const MyProfileTab: React.FC = () => {
  const { user } = useSelector((state: IStore) => state)
  const [form] = useForm()
  const [isEditing, setIsEditing] = useState(true)

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      // TODO: Implement profile update API call
      Notification({
        message: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        type: 'success',
      })
      setIsEditing(false)
    } catch (error) {
      Notification({
        message: 'Unable to process request',
        description: 'Unable to process request',
        type: 'error',
      })
      throw error
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setIsEditing(false)
  }

  const handleDeleteAccount = () => {
    // TODO: Implement delete account functionality
  }

  return (
    <StyledTabContent>
      <StyledPageHeader>
        <StyledSectionTitle>My Profile</StyledSectionTitle>
        {isEditing && (
          <StyledButtonGroup>
            <StyledCancelButton onClick={handleCancel}>Cancel</StyledCancelButton>
            <StyledSaveButton type="primary" onClick={handleSave}>
              Save Changes
            </StyledSaveButton>
          </StyledButtonGroup>
        )}
      </StyledPageHeader>
      <Spacer value={27} />
      <StyledProfileSection>
        <StyledSectionSubTitle>Personal Information</StyledSectionSubTitle>
        <Spacer value={12} />
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
          }}
        >
          <Row gutter={[14, 0]}>
            <Col span={12}>
              <StyledFormItem label="First Name" name="firstName">
                <Input placeholder="Enter first name" />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem label="Last Name" name="lastName">
                <Input placeholder="Enter last name" />
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={[14, 0]}>
            <Col span={12}>
              <StyledFormItem label="Email" name="email">
                <Input disabled placeholder="Enter email" />
              </StyledFormItem>
            </Col>
          </Row>
        </Form>
      </StyledProfileSection>
      <Spacer value={32} />
      <StyledAccountDeletionSection>
        <StyledSectionSubTitle>Account Deletion</StyledSectionSubTitle>
        <StyledDivider />
        <Spacer value={16} />
        <StyledDeleteAccountContent>
          <Box>
            <StyledDeleteAccountTitle>Delete Account</StyledDeleteAccountTitle>
            <Spacer value={6} />
            <StyledDeleteAccountDescription>Permanently delete your account and data.</StyledDeleteAccountDescription>
          </Box>
          <StyledDeleteButton danger icon={<DeleteOutlined />} onClick={handleDeleteAccount}>
            Delete Account
          </StyledDeleteButton>
        </StyledDeleteAccountContent>
      </StyledAccountDeletionSection>
    </StyledTabContent>
  )
}

