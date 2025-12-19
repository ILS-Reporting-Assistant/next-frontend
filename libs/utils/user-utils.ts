import { Client } from '@app/types'

/**
 * Gets the full name from an object with firstName and lastName properties
 * @param person - Object with optional firstName and lastName properties
 * @param fallback - Fallback value if name is empty (default: '-')
 * @returns Formatted full name or fallback
 */
export const getFullName = (
  person: { firstName?: string; lastName?: string } | null | undefined,
  fallback = '-',
): string => {
  if (!person) return fallback
  const firstName = person.firstName || ''
  const lastName = person.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  return fullName || fallback
}

/**
 * Gets avatar text (initials) from an object with firstName and lastName properties
 * @param person - Object with optional firstName and lastName properties
 * @param defaultInitial - Default initial if no name is available (default: 'A')
 * @returns Avatar text (initials) or default initial
 */
export const getAvatarText = (
  person: { firstName?: string; lastName?: string } | null | undefined,
  defaultInitial = 'A',
): string => {
  if (!person) return defaultInitial

  const firstName = person.firstName || ''
  const lastName = person.lastName || ''
  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : ''
  const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : ''

  if (firstLetter && lastLetter) {
    return `${firstLetter}${lastLetter}`
  }
  if (firstLetter) {
    return firstLetter
  }
  if (lastLetter) {
    return lastLetter
  }
  return defaultInitial
}

export const getClientName = (client: Client) => {
  return `${client?.firstName || ''} ${client?.lastName || ''}`.trim() || '-'
}

export const truncateFileName = (fileName: string, maxLength = 15) => {
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex === -1) return fileName

  const name = fileName.substring(0, dotIndex)
  const extension = fileName.substring(dotIndex)

  if (name.length > maxLength) {
    return name.substring(0, maxLength) + '...' + extension
  }
  return fileName
}
