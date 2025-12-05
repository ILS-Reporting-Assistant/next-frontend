export interface AddClientProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
}

export interface AddClientFormValues {
  firstName: string
  lastName: string
  email?: string
  startDate?: any
  endDate?: any
}

export interface StyledAvatarProps {
  $backgroundColor?: string
  $textColor?: string
}

