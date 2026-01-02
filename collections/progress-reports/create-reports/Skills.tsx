import { Box, Spacer } from '@app/components'
import { SkillsProps } from '@app/types'
import { popularSkills } from '@app/utils'
import { useEffect, useState } from 'react'
import {
  StyledPopularSkillsContainer,
  StyledPopularSkillsLabel,
  StyledPopularSkillTag,
  StyledSelectAllButton,
  StyledSelectedSkillsContainer,
  StyledSelectedSkillsLabel,
  StyledSelectedSkillsList,
  StyledSelectedSkillTag,
  StyledStep2Description,
  StyledStep2Heading,
} from './elements'

export const Skills = ({ selectedSkills = [], onSkillsChange }: SkillsProps) => {
  const [isAllSkillsSelected, setIsAllSkillsSelected] = useState(false)

  const handleSelectSkill = (value: string) => {
    if (!selectedSkills.includes(value) && onSkillsChange) {
      onSkillsChange([...selectedSkills, value])
    }
  }

  const handleRemoveSkill = (skill: string) => {
    if (onSkillsChange) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill))
    }
  }

  const handlePopularSkillClick = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      handleSelectSkill(skill)
    }
  }

  const handleSelectAllSkills = () => {
    if (!onSkillsChange) return
    if (isAllSkillsSelected) {
      onSkillsChange([])
      setIsAllSkillsSelected(false)
    } else {
      onSkillsChange(popularSkills)
      setIsAllSkillsSelected(true)
    }
  }

  useEffect(() => {
    if (selectedSkills.length === popularSkills.length) {
      setIsAllSkillsSelected(true)
    } else {
      setIsAllSkillsSelected(false)
    }
  }, [selectedSkills])

  return (
    <>
      <StyledStep2Heading level={3}>Which skill areas will you be addressing?</StyledStep2Heading>

      <StyledStep2Description>
        Select the functional areas that apply to this client's assessment. We'll gather information for each one.
      </StyledStep2Description>

      <Box>
        {/* <StyledSkillsLabel>
          <StyledSkillsIcon>
            <Icon.AppstoreOutlined />
          </StyledSkillsIcon>
          Skills
        </StyledSkillsLabel>
        <StyledSkillsSelect
          placeholder="Select skills"
          showSearch
          onSelect={handleSelectSkill}
          filterOption={(input, option) => {
            const value = String(option?.value ?? option?.label ?? option?.children ?? '')
            return value.toLowerCase().includes(input.toLowerCase())
          }}
        >
          {dummySkills
            .filter((skill) => !selectedSkills.includes(skill))
            .map((skill) => (
              <Option key={skill} value={skill}>
                {skill}
              </Option>
            ))}
        </StyledSkillsSelect> */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StyledPopularSkillsLabel>Popular Skills</StyledPopularSkillsLabel>
          <StyledSelectAllButton onClick={() => handleSelectAllSkills()}>
            {isAllSkillsSelected ? 'Deselect All' : 'Select All'}
          </StyledSelectAllButton>
        </Box>
        <Spacer value={16} />
        <StyledPopularSkillsContainer>
          {popularSkills.map((skill) => (
            <StyledPopularSkillTag key={skill} onClick={() => handlePopularSkillClick(skill)}>
              {skill}
            </StyledPopularSkillTag>
          ))}
        </StyledPopularSkillsContainer>

        {selectedSkills.length > 0 && (
          <StyledSelectedSkillsContainer>
            <StyledSelectedSkillsLabel>Selected Skills ({selectedSkills.length})</StyledSelectedSkillsLabel>
            <StyledSelectedSkillsList>
              {selectedSkills.map((skill) => (
                <StyledSelectedSkillTag key={skill} closable onClose={() => handleRemoveSkill(skill)}>
                  {skill}
                </StyledSelectedSkillTag>
              ))}
            </StyledSelectedSkillsList>
          </StyledSelectedSkillsContainer>
        )}
      </Box>
    </>
  )
}
