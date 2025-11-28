export enum UserStatus {
  ACTIVE = 'Active',
  PENDING = 'Invite Pending',
}

export const USER_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  [UserStatus.ACTIVE]: { bg: '#ecf6ee', color: '#299B47' },
  [UserStatus.PENDING]: { bg: '#fbf6ea', color: '#D7A012' },
}
