import { VerifyInvitationResponse } from '../api'

/**
 * Form values for the invitation completion form
 */
export interface InvitationFormValues {
  password: string
  confirmPassword: string
}

/**
 * Invitation data received from the verify invitation API
 * This is an alias for VerifyInvitationResponse to provide a more semantic name
 * for use in the Invitation component
 */
export type InvitationData = VerifyInvitationResponse

