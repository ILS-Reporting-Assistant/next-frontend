import { Spacer, ListItem } from '@app/components'
import React from 'react'
import {
  StyledComplianceHeading,
  StyledComplianceDescription,
  StyledComplianceDescriptionWithPadding,
  StyledComplianceList,
  StyledSkillsLabel,
  StyledSkillsSelect,
} from './elements'

export const ComplianceNotice = () => {
  const onChange = (value: string) => {
    // console.log(`selected ${value}`)
  }

  return (
    <>
      <Spacer value={4} />

      <StyledComplianceHeading level={3}>Let's Keep Everything Safe & Compliant</StyledComplianceHeading>

      <StyledComplianceDescription>
        Our system automatically reviews your entry and removes or replaces protected information to help keep your data
        de-identified and secure.
      </StyledComplianceDescription>

      <StyledComplianceDescriptionWithPadding>
        The system checks for and may remove or modify items such as:
      </StyledComplianceDescriptionWithPadding>

      <StyledComplianceList
        dataSource={[
          'Full names (use initials or "client" instead)',
          'Dates of birth or specific ages',
          'Addresses or specific locations',
          'Social security numbers',
          'Medical record numbers',
          'Any other personally identifiable information (PHI)',
        ]}
        renderItem={(item: string) => <ListItem>{item}</ListItem>}
      />
      <Spacer value={32} />
      <StyledSkillsLabel>Select a client</StyledSkillsLabel>
      <StyledSkillsSelect
        showSearch
        placeholder="Select a client"
        onChange={onChange}
        options={[
          {
            value: 'chris',
            label: 'Chris Wilson',
          },
          {
            value: 'john',
            label: 'John Smith',
          },
        ]}
      />
    </>
  )
}
