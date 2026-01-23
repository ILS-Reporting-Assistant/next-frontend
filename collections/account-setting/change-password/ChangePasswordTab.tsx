import { Box, Col, Form, InputPassword, Notification, Row, Spacer, useForm } from '@app/components'
import React, { useState } from 'react'
import { StyledFormItem, StyledUpdatePasswordButton } from './elements'
import { StyledTabContent, StyledSectionTitle, StyledSectionLabel } from '../shared'
import { isValidationError } from '@app/utils'
import { extractErrorMessage, authService } from '@app/services'

export const ChangePasswordTab: React.FC = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdatePassword = async () => {
    try {
      setIsSubmitting(true)
      const values = await form.validateFields()

      await authService.changePassword({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
      })

      Notification({
        message: 'Password Updated Successfully',
        description: 'Your password has been updated successfully.',
        type: 'success',
      })

      form.resetFields()
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Unable to Update Password',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StyledTabContent>
      <Box display="flex" justifyContent="space-between">
        <StyledSectionLabel>Change Password</StyledSectionLabel>
        <StyledUpdatePasswordButton type="primary" onClick={handleUpdatePassword} loading={isSubmitting}>
          Update password
        </StyledUpdatePasswordButton>
      </Box>
      <Spacer value={16} />
      <Form form={form} layout="vertical">
        <Row gutter={[14, 0]}>
          <Col span={12}>
            <StyledFormItem
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: 'Please enter your old password' }]}
            >
              <InputPassword placeholder="Enter old password" />
            </StyledFormItem>
          </Col>
        </Row>
        <Row gutter={[14, 0]}>
          <Col span={12}>
            <StyledFormItem
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 8, message: 'Password must be at least 8 characters long' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('New password cannot be the same as the old password'))
                  },
                }),
              ]}
            >
              <InputPassword placeholder="Enter new password" />
            </StyledFormItem>
          </Col>
        </Row>
        <Row gutter={[14, 0]}>
          <Col span={12}>
            <StyledFormItem
              label="Confirm New Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords do not match!'))
                  },
                }),
              ]}
            >
              <InputPassword placeholder="Confirm new password" />
            </StyledFormItem>
          </Col>
        </Row>
      </Form>
    </StyledTabContent>
  )
}
