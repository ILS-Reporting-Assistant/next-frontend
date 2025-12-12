export interface SuccessProps {
  onComplete?: () => void
}

export interface ProgressStep {
  id: number
  text: string
  completed: boolean
}
