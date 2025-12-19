import { Client } from '@app/types'

export interface EditClientProps {
  open: boolean
  setOpen: (open: boolean) => void
  client: Client | null
  onSuccess?: () => void
}

