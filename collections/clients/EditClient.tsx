import { Button, DatePicker, Drawer, FormItem, Notification, useForm } from '@app/components'
import { IStore } from '@app/redux'
import { clientsService, extractErrorMessage } from '@app/services'
import { EditClientProps } from '@app/types'
import { isValidationError } from '@app/utils'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyledFooterContainer, StyledForm, StyledFormInput } from './elements'
import moment from 'moment'

export const EditClient = ({ open, setOpen, client, onSuccess }: EditClientProps) => {
  const [form] = useForm()
  const { user } = useSelector((state: IStore) => state)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const organizationId = user.currentOrganizationId

  useEffect(() => {
    if (client && open) {
      form.setFieldsValue({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        startDate: client.startDate ? moment(client.startDate) : undefined,
        endDate: client.endDate ? moment(client.endDate) : undefined,
      })
    }
  }, [client, open, form])

  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!client) return

    try {
      setIsSubmitting(true)
      const values = await form.validateFields()

      if (!user.uid) {
        Notification({
          message: 'Error',
          description: 'User ID is missing',
          type: 'error',
        })
        return
      }

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email || undefined,
        startDate: values.startDate ? moment(values.startDate).startOf('day').format() : undefined,
        endDate: values.endDate ? moment(values.endDate).endOf('day').format() : undefined,
        ...(organizationId ? { organizationId } : {}),
        userId: user.uid,
      }

      const response = await clientsService.updateClient(client._id, payload)

      Notification({
        message: 'Client updated',
        description: response.message || 'Client has been updated successfully.',
        type: 'success',
      })
      form.resetFields()

      if (onSuccess) {
        onSuccess()
      }
      handleCancel()
    } catch (error: any) {
      if (isValidationError(error)) return

      Notification({
        message: 'Cannot Update Client',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer
      title="Edit Client"
      open={open}
      onClose={handleCancel}
      placement="right"
      footer={
        <StyledFooterContainer gap="12px">
          <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>
            Update Client
          </Button>
          <Button type="default" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </StyledFooterContainer>
      }
    >
      <StyledForm form={form} layout="vertical">
        <FormItem label="First Name*" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
          <StyledFormInput placeholder="Enter first name" />
        </FormItem>

        <FormItem label="Last Name*" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
          <StyledFormInput placeholder="Enter last name" />
        </FormItem>

        <FormItem label="Email" name="email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
          <StyledFormInput placeholder="Enter email (optional)" />
        </FormItem>

        <FormItem label="Start Date" name="startDate">
          <DatePicker style={{ width: '100%', height: '40px' }} placeholder="Select start date" format="YYYY-MM-DD" />
        </FormItem>

        <FormItem label="End Date" name="endDate">
          <DatePicker style={{ width: '100%', height: '40px' }} placeholder="Select end date" format="YYYY-MM-DD" />
        </FormItem>
      </StyledForm>
    </Drawer>
  )
}
