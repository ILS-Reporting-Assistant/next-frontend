import { Button, Drawer, FlexContainer, Input, Notification, Select, Spacer, Text, useForm } from '@app/components'
import { Form } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { usersService, extractErrorMessage } from '@app/services'
import { InviteUserFormValues, InviteUserProps } from '@app/types'
import { isValidationError } from '@app/utils'
import { StyledFormInput, StyledFormSelect } from './elements'

export const InviteUser = ({ open, setOpen, onSuccess }: InviteUserProps) => {
  const [form] = useForm()
  const { user } = useSelector((state: IStore) => state)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [invitationUrl, setInvitationUrl] = useState<string | null>(null)

  const organizationId = user.currentOrganizationId

  const getFrontendUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
  }

  const handleCancel = () => {
    form.resetFields()
    setInvitationUrl(null)
    setOpen(false)
  }

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        Notification({
          message: 'Copied to clipboard',
          description: 'Invitation URL has been copied to clipboard.',
          type: 'success',
        })
      })
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const values = (await form.validateFields()) as InviteUserFormValues

      if (!organizationId) {
        Notification({
          message: 'Error',
          description: 'Organization ID is missing',
          type: 'error',
        })
        return
      }

      const response = await usersService.createInvitation(organizationId, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      })

      // Generate invitation URL
      const frontendUrl = getFrontendUrl()
      const url = `${frontendUrl}/invitation?token=${response.data._id}`
      setInvitationUrl(url)

      Notification({
        message: 'Invitation sent',
        description: response.message || 'Invitation has been sent successfully.',
        type: 'success',
      })
      form.resetFields()

      // Refresh the invitations list
      if (onSuccess) {
        onSuccess()
      }
      handleCancel()
    } catch (error: any) {
      if (isValidationError(error)) return

      Notification({
        message: 'Cannot Send Invitation',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer
      title="Invite New User"
      open={open}
      onClose={handleCancel}
      placement="right"
      footer={
        <FlexContainer justifyContent="flex-start" gap="12px">
          <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>
            Invite User
          </Button>
          <Button type="default" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </FlexContainer>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
          <StyledFormInput placeholder="Enter first name" />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
          <StyledFormInput placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Email*"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <StyledFormInput placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Role*" name="role" rules={[{ required: true, message: 'Select role' }]}>
          <StyledFormSelect
            placeholder="Select role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        </Form.Item>
      </Form>
      {/* {invitationUrl && (
        <>
          <Spacer value={24} />
          <Text strong>Invitation URL:</Text>
          <Spacer value={8} />
          <FlexContainer gap="8px" alignItems="center">
            <Input
              value={invitationUrl}
              readOnly
              style={{ flex: 1 }}
              onClick={(e) => {
                e.currentTarget.select()
                copyToClipboard(invitationUrl)
              }}
            />
            <Button type="default" onClick={() => copyToClipboard(invitationUrl)} style={{ whiteSpace: 'nowrap' }}>
              Copy
            </Button>
          </FlexContainer>
        </>
      )} */}
    </Drawer>
  )
}
