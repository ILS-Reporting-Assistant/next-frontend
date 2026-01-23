import { DeleteOutlined } from '@ant-design/icons'
import { Box, Col, Form, Input, InputPassword, Modal, Notification, Row, Spacer, Text, useForm } from '@app/components'
import { IStore, logout, userUpdate } from '@app/redux'
import { authService, extractErrorMessage, usersService, organizationsService } from '@app/services'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { UserRole, AccountType } from '@app/enums'
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
import { ChangePasswordTab } from '../change-password'
import { isValidationError } from '../../../libs/utils'

export const MyProfileTab: React.FC = () => {
  const { user } = useSelector((state: IStore) => state)
  const dispatch = useDispatch()
  const router = useRouter()
  const [form] = useForm()
  const [deleteForm] = useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [organizationName, setOrganizationName] = useState<string>('')

  const isOrganization = user?.type === AccountType.ORGANIZATION
  const isOwner = user?.currentOrganizationRole === UserRole.OWNER
  const organizationId = user?.currentOrganizationId

  const fetchOrganization = async () => {
    if (isOrganization && organizationId) {
      try {
        const response = await organizationsService.getOrganization(organizationId)
        const orgName = response.data?.organizationName || response.data?.name || ''
        setOrganizationName(orgName)
        form.setFieldsValue({ organizationName: orgName })
      } catch (error) {
        // Silently fail - organization name is optional
      }
    }
  }

  useEffect(() => {
    fetchOrganization()
  }, [isOrganization, organizationId, form])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const values = await form.validateFields()
      const { firstName, lastName, organizationName: orgName } = values

      // Update user profile
      const response = await usersService.updateProfile({ firstName, lastName })
      dispatch(userUpdate({ firstName, lastName }))

      // Update organization name if user is owner and organization name changed
      if (isOrganization && isOwner && organizationId && orgName && orgName !== organizationName) {
        try {
          await organizationsService.updateOrganization({
            organizationId,
            organizationName: orgName,
          })
          setOrganizationName(orgName)
        } catch (error) {
          // If organization update fails, still show success for profile update
          Notification({
            message: 'Profile updated, but failed to update organization name',
            description: extractErrorMessage(error),
            type: 'warning',
          })
        }
      }

      Notification({
        message: 'Profile updated',
        description: response.message || 'Your profile has been updated successfully.',
        type: 'success',
      })
      setIsEditing(false)
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Failed to update profile',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    form.setFieldsValue({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      organizationName: organizationName || '',
    })
    setIsEditing(false)
  }

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true)
    deleteForm.resetFields()
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    deleteForm.resetFields()
  }

  const handleDeleteConfirm = async () => {
    try {
      const values = await deleteForm.validateFields()
      setIsDeleting(true)
      await authService.deleteAccount({
        password: values.password,
        organizationId: user?.currentOrganizationId || undefined,
      })
      Notification({
        message: 'Account deleted',
        description: 'Your account has been permanently deleted.',
        type: 'success',
      })
      dispatch(logout())
      router.push('/auth/sign-in')
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Failed to delete account',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <StyledTabContent>
      <StyledPageHeader>
        <StyledSectionTitle>My Profile</StyledSectionTitle>
        {isEditing ? (
          <StyledButtonGroup>
            <StyledCancelButton onClick={handleCancel} disabled={isSaving}>
              Cancel
            </StyledCancelButton>
            <StyledSaveButton type="primary" onClick={handleSave} loading={isSaving} disabled={isSaving}>
              Save Changes
            </StyledSaveButton>
          </StyledButtonGroup>
        ) : (
          <StyledSaveButton type="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </StyledSaveButton>
        )}
      </StyledPageHeader>
      <Spacer value={27} />
      <StyledProfileSection>
        <StyledSectionSubTitle>Personal Information</StyledSectionSubTitle>
        <StyledDivider />
        <Spacer value={12} />
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            organizationName: organizationName || '',
          }}
        >
          <Row gutter={[14, 0]}>
            <Col span={12}>
              <StyledFormItem label="First Name" name="firstName">
                <Input placeholder="Enter first name" readOnly={!isEditing} />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem label="Last Name" name="lastName">
                <Input placeholder="Enter last name" readOnly={!isEditing} />
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={[14, 0]}>
            <Col span={12}>
              <StyledFormItem label="Email" name="email">
                <Input disabled placeholder="Enter email" />
              </StyledFormItem>
            </Col>
            {isOrganization && (
              <Col span={12}>
                <StyledFormItem label="Organization Name" name="organizationName">
                  <Input placeholder="Enter organization name" readOnly={!isEditing || !isOwner} disabled={!isOwner} />
                </StyledFormItem>
              </Col>
            )}
          </Row>
        </Form>
      </StyledProfileSection>
      <Spacer value={32} />
      <StyledProfileSection>
        <StyledSectionSubTitle>Change Password</StyledSectionSubTitle>
        <StyledDivider />
        <Spacer value={16} />
        <ChangePasswordTab />
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
      <Modal
        open={isDeleteModalOpen}
        title="Delete Account"
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        confirmLoading={isDeleting}
        okText="Delete Account"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        destroyOnClose
      >
        <Text>
          This action cannot be undone. This will permanently delete your account, all your clients, reports, and cancel
          your subscription. Please enter your password to confirm.
        </Text>
        <Spacer value={16} />
        <Form form={deleteForm} layout="vertical">
          <StyledFormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <InputPassword placeholder="Enter your password" />
          </StyledFormItem>
        </Form>
      </Modal>
    </StyledTabContent>
  )
}
