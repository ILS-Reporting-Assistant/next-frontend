import { ListItem, Spacer } from '@app/components'
import { ComplianceNoticeProps } from '@app/types'
import {
  StyledComplianceDescription,
  StyledComplianceDescriptionWithPadding,
  StyledComplianceHeading,
  StyledComplianceList,
  StyledSkillsLabel,
  StyledSkillsSelect,
} from './elements'

export const ComplianceNotice = ({
  clients = [],
  clientsLoading = false,
  selectedClient,
  onClientChange,
}: ComplianceNoticeProps) => {
  const getClientName = (client: any) => {
    return `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'Unknown'
  }

  const clientOptions = clients.map((client) => ({
    value: client._id,
    label: getClientName(client),
    client: client,
  }))

  const handleChange = (value: string) => {
    const client = clients.find((c) => c._id === value)
    if (onClientChange && client) {
      onClientChange(client)
    }
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
        placeholder={clientsLoading ? 'Loading clients...' : 'Select a client'}
        onChange={handleChange}
        value={selectedClient?._id}
        loading={clientsLoading}
        options={clientOptions}
        filterOption={(input, option) => {
          const label = String(option?.label ?? '')
          return label.toLowerCase().includes(input.toLowerCase())
        }}
      />
    </>
  )
}
