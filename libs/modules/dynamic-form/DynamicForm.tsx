import { Card, Form, If, Spacer, Title } from '@app/components'
import React, { useEffect } from 'react'

import { DynamicInput } from './DynamicInput'
import { StyledCol, StyledRow, StyledSpace } from './elements'
import { IForm } from './types'

export const DynamicForm: React.FC<IForm> = (props) => {
  useEffect(() => {
    props.form.setFieldsValue(props.initialValues)
  }, [])

  const getFormFields = (field, i) => {
    return (
      <StyledRow key={i}>
        <If condition={field.inline?.length}>
          {field.inline?.map((subField, j) => (
            <StyledCol key={j} textAlign={subField.align} sm={24} lg={24 / field.inline.length}>
              <DynamicInput
                field={subField}
                onCancel={props.onCancel}
                onSubmit={props.onSubmit}
                disabled={props.disabled}
                isLoading={props?.isLoading}
              />
            </StyledCol>
          ))}
        </If>
        <If condition={!field.inline?.length}>
          <StyledCol span={24} textAlign={field.align}>
            <DynamicInput
              field={field}
              onCancel={props.onCancel}
              onSubmit={props.onSubmit}
              disabled={props.disabled}
              isLoading={props?.isLoading}
            />
          </StyledCol>
        </If>
      </StyledRow>
    )
  }

  return (
    <Form layout="vertical" style={{ width: '100%' }} form={props.form} initialValues={props.initialValues}>
      {props.fields.map((field, i) => (
        <>
          <If condition={field.card} key={i}>
            <StyledSpace direction="vertical" size="middle">
              {field?.card?.title && <Title level={2}>{field.card.title}</Title>}
              <Card>
                {field?.card?.fields?.map((field, i) => {
                  return getFormFields(field, i)
                })}
              </Card>
              <Spacer value={30} />
            </StyledSpace>
          </If>
          <If condition={!field.card}>{getFormFields(field, i)}</If>
        </>
      ))}
    </Form>
  )
}
