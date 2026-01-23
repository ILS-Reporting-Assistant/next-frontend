import { UserRole } from '@app/enums'

export const isValidationError = (error: unknown): error is { errorFields: unknown[] } => {
  return Boolean(error && typeof error === 'object' && 'errorFields' in error)
}

/**
 * Keywords that indicate a plan limit has been reached
 */
const LIMIT_ERROR_KEYWORDS = [
  'limit reached',
  'limit has been reached',
  'reached your report limit',
  'reached your limit',
]

/**
 * Transforms limit-related error messages based on user role.
 * - For Owners: Returns the original error (they can upgrade the plan)
 * - For Members: Returns a user-friendly message directing them to contact the Owner
 */
export const getLimitErrorMessage = (errorMessage: string, userRole?: UserRole | string): string => {
  if (!errorMessage) return errorMessage

  const isLimitError = LIMIT_ERROR_KEYWORDS.some((keyword) => errorMessage.toLowerCase().includes(keyword))

  if (isLimitError && userRole !== UserRole.OWNER) {
    return `${errorMessage}. Please contact the organization Owner.`
  }

  return errorMessage
}
