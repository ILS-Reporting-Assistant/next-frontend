export const ENDPOINT = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    REQUEST_PASSWORD_RESET: '/auth/request-password-reset',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESEND_OTP: '/auth/resend-otp',
    REFRESH: '/auth/refresh',
  },
  ORGANIZATIONS: {
    USERS: (organizationId: string) => `/organizations/${organizationId}/users`,
    INVITATIONS: (organizationId: string) => `/organizations/${organizationId}/invitations`,
  },
  INVITATIONS: {
    CREATE: (organizationId: string) => `/invitations/${organizationId}/invite`,
    RESEND: (organizationId: string) => `/invitations/${organizationId}/resend`,
    DELETE: (organizationId: string, invitationId: string) => `/invitations/${organizationId}/${invitationId}`,
    VERIFY: '/invitations/verify',
    COMPLETE: '/invitations/complete',
  },
}
