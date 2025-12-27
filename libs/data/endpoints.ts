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
  CLIENTS: {
    LIST: '/clients',
    GET: (clientId: string) => `/clients/${clientId}`,
    CREATE: '/clients',
    UPDATE: (clientId: string) => `/clients/${clientId}`,
    DELETE: (clientId: string) => `/clients/${clientId}`,
  },
  INVITATIONS: {
    CREATE: (organizationId: string) => `/invitations/${organizationId}/invite`,
    RESEND: (organizationId: string) => `/invitations/${organizationId}/resend`,
    DELETE: (organizationId: string, invitationId: string) => `/invitations/${organizationId}/${invitationId}`,
    VERIFY: '/invitations/verify',
    COMPLETE: '/invitations/complete',
  },
  STORAGE: {
    UPLOAD_DOCUMENT: '/storage/upload/document',
    GET_SIGNED_URL: (fileId: string) => `/storage/file/${fileId}/signed-url`,
  },
  REPORTS: {
    LIST: '/reports',
    GET: (reportId: string) => `/reports/${reportId}`,
    COUNT: '/reports/count',
    BY_CLIENT: (clientId: string) => `/reports/client/${clientId}`,
    GENERATE_ASSESSMENT_REPORT: '/reports/generate/assessment',
    GENERATE_PROGRESS_REPORT: '/reports/generate/progress',
    GENERATE_ISP_REPORT: '/reports/generate/isp',
    GENERATE_PDF: '/reports/generate/pdf',
    GENERATE_DOC: '/reports/generate/doc',
    SAVE: '/reports/create',
    REQUEST_AI_REVISION: '/reports/request-ai-revision',
  },
  STATUS_HISTORY: {
    BY_CLIENT: (clientId: string) => `/status-history/client/${clientId}`,
  },
}
