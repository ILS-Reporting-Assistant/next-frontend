import { GenerateAssessmentReportResponse } from '../types/collections/create-reports'

// Helper method to process SSE response
export const processSSEResponse = async (
  response: Response,
  onProgress?: (progress: { stage: string; message: string; progress?: number }) => void,
): Promise<GenerateAssessmentReportResponse> => {
  // Handle SSE stream
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) {
    throw new Error('Response body is not readable')
  }

  let buffer = ''
  let result: GenerateAssessmentReportResponse | null = null
  let currentEvent: string | null = null

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.trim() === '') {
        // Empty line indicates end of event, process it
        currentEvent = null
        continue
      }

      if (line.startsWith('event: ')) {
        currentEvent = line.substring(7).trim()
        continue
      }

      if (line.startsWith('data: ')) {
        const data = line.substring(6).trim()
        if (data) {
          try {
            const parsed = JSON.parse(data)

            if (currentEvent === 'progress') {
              // Progress event
              onProgress?.(parsed)
            } else if (currentEvent === 'complete') {
              // Complete event
              result = parsed
            } else if (currentEvent === 'error') {
              // Error event
              throw new Error(parsed.message || 'An error occurred')
            } else {
              // Fallback: try to determine event type from data structure
              if (parsed.stage || parsed.message) {
                onProgress?.(parsed)
              } else if (parsed.content !== undefined) {
                result = parsed
              } else if (parsed.message) {
                throw new Error(parsed.message)
              }
            }
          } catch (e) {
            // Ignore JSON parse errors for non-JSON data
            if (e instanceof SyntaxError) {
              continue
            }
            throw e
          }
        }
      }
    }
  }

  if (!result) {
    throw new Error('No result received from server')
  }

  return result
}
