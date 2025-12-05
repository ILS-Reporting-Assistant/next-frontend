import { CreateInvitationPayload } from '../api'

/**
 * Props for the InviteUser component
 */
export interface InviteUserProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess?: () => void
}

/**
 * Form values for the invite user form
 * This is an alias for CreateInvitationPayload to provide a more semantic name
 * for use in the InviteUser component
 */
export type InviteUserFormValues = CreateInvitationPayload

/**
 * Role option for the role select dropdown
 */
export interface RoleOption {
  label: string
  value: string
}

