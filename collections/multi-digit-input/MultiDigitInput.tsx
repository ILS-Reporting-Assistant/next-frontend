import { Spacer } from '@app/components'
import { MultiDigitProps } from '@app/types'
import React, { useEffect, useState } from 'react'

import { StyledFlexContainer, StyledInput } from './elements'

export const MultiDigitInput: React.FC<MultiDigitProps> = ({ lengthOfDigits, ...props }) => {
  const [code, setCode] = useState<string>(new Array(lengthOfDigits + 1).join('-'))

  useEffect(() => {
    setCode(new Array(lengthOfDigits + 1).join('-'))
  }, [lengthOfDigits])

  useEffect(() => {
    props.setCode(code)
  }, [code])

  const handleCodeChanged = (e, index) => {
    const value: string = e.target.value
    let unChangedPart = ''
    if (index > 0) {
      unChangedPart = code.slice(0, index)
    }
    let changedPart = code.slice(index, code.length)
    const cArray = changedPart.split('')
    if (value !== '')
      value.split('').forEach((targetValue, targetValueIndex) => {
        if (targetValueIndex < cArray.length && Number.isInteger(+targetValue)) cArray[targetValueIndex] = targetValue
      })
    else cArray[0] = '-'
    changedPart = cArray.join('')
    setCode(`${unChangedPart}${changedPart}`)
  }

  const focusNextTargetInput = (index) => {
    const nextTargetInput: any = document.getElementById(`security-code-${index}`)
    nextTargetInput?.focus()
    if (code[index] !== '-') nextTargetInput?.setSelectionRange(0, 1)
  }

  return (
    <>
      {/* <Text type="secondary">Type your {lengthOfDigits}-digit security code here:</Text> */}
      <Spacer value={16} />
      <StyledFlexContainer>
        {code.split('').map((value, index) => {
          return (
            <>
              <StyledInput
                key={index}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  ;(e.target as HTMLInputElement).setSelectionRange(0, 1)
                }}
                id={`security-code-${index}`}
                value={value === '-' ? '' : value}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.which === 8) {
                    const element = e.target as HTMLInputElement
                    if (!element.value) {
                      const prevInputIndex = index - 1
                      focusNextTargetInput(prevInputIndex)
                    }
                  }
                }}
                onInput={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  const element = e.target as HTMLInputElement
                  if (!element.value.split('').find((v) => !Number.isInteger(+v))) {
                    handleCodeChanged(e, index)
                    if (element.value) {
                      const nextInputIndex = element.value.slice(0, 6).length + index
                      focusNextTargetInput(nextInputIndex)
                    }
                  }
                }}
              />
            </>
          )
        })}
      </StyledFlexContainer>
    </>
  )
}
