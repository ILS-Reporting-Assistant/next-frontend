export const isValidationError = (error: unknown): error is { errorFields: unknown[] } => {
  return Boolean(error && typeof error === 'object' && 'errorFields' in error)
}
