import { Box, Button, Input, Link, List, Modal, Row, Select, Tag, Text, TextArea, TipTap, Title } from '@app/components'
import { maxTablet } from '@app/styles'
import {
  BoxProps,
  ButtonProps,
  InputProps,
  LinkProps,
  ListProps,
  ModalProps,
  RowProps,
  SelectProps,
  TagProps,
  TextAreaProps,
  TextProps,
  TipTapProps,
} from '@app/types'
import { TitleProps } from 'antd/es/typography/Title'
import styled from 'styled-components'

export const StyledContainer = styled((props: RowProps) => <Row {...props} />)`
  background: ${(props) => props.theme.color.background};
  min-height: 100%;
  width: 100%;
  margin-left: 0 !important;
  margin-right: 0 !important;
  @media only screen and (max-width: ${maxTablet}) {
    min-height: 1vh;
  }
`

export const StyledContentWrapper = styled((props: BoxProps) => <Box {...props} />)`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
`

export const StyledBackLink = styled((props: LinkProps) => <Link {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  &:hover {
    color: #232323;
    text-decoration: none;
  }
`

export const StyledBackIcon = styled((props: BoxProps) => <Box {...props} />)`
  width: 10px;
  height: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const StyledBackIconInner = styled((props: TextProps) => <Text {...props} />)`
  font-size: 10px;
  width: 10px;
  height: 9px;
`

export const StyledProgressTitle = styled((props: TitleProps) => <Title {...props} />)`
  color: black;
  font-size: 18px !important;
  line-height: 100%;
  padding-top: 11px;
  font-weight: 500;
  margin-bottom: 0 !important;
`

export const StyledProgressBarWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin: 8px 0;

  .ant-progress-bg {
    background-color: black !important;
  }
`

export const StyledStepText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  padding-bottom: 29px;
  display: block;
`

export const StyledStepContentWrapper = styled((props: BoxProps) => <Box {...props} />)`
  // Scrolling is now handled by the entire page
`

export const StyledComplianceHeading = styled((props: TitleProps) => <Title {...props} />)`
  color: #232323;
  font-size: 20px !important;
  line-height: 100%;
  padding-bottom: 8px;
  font-weight: 500;
  margin-bottom: 0 !important;
`

export const StyledComplianceDescription = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 150%;
  padding-bottom: 16px;
  display: block;
`

export const StyledComplianceDescriptionWithPadding = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  padding-bottom: 16px;
  display: block;
`

export const StyledComplianceListText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  display: block;
`

export const StyledComplianceList = styled((props: ListProps<any>) => <List {...props} />)`
  list-style: none;
  padding: 0;
  margin: 0;

  &.ant-list {
    border: none;
    background: transparent;
  }

  .ant-list-items {
    .ant-list-item {
      color: #232323;
      font-weight: 800;
      font-size: 14px;
      line-height: 100%;
      margin-bottom: 14px;
      padding-left: 24px;
      position: relative;
      border: none;
      padding-top: 0px;
      padding-bottom: 0px;
      &:before {
        content: '•';
        position: absolute;
        left: 0;
      }
    }
  }
`

export const StyledButtonWrapper = styled((props: BoxProps) => <Box {...props} />)`
  position: fixed;
  bottom: 0;
  left: 250px;
  right: 0;
  background: #e8e8e8;
  padding: 16px 57px;
  z-index: 1000;
  margin-top: 20px;

  @media only screen and (max-width: ${maxTablet}) {
    left: 0;
    padding: 16px 25px;
  }
`

export const StyledProgressReportWrapper = styled((props: BoxProps) => <Box {...props} />)`
  position: fixed;
  bottom: 100px;
  left: 250px;
  right: 0;
  background: #e8e8e8;
  padding: 16px 57px;
  z-index: 1000;

  @media only screen and (max-width: ${maxTablet}) {
    left: 0;
    padding: 16px 25px;
  }
`

export const StyledButtonContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const StyledButtonContainerWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 0px 0px;

  @media only screen and (max-width: ${maxTablet}) {
    padding: 0px 12px;
  }
`

export const StyledGoBackButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border: 1px solid black !important;
  color: black !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-default {
    background: white !important;
    border-color: black !important;
    color: black !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

export const StyledNextButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border-color: black !important;
  color: white !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    border-radius: 4px !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

// Step 2 Styles
export const StyledStep2Heading = styled((props: TitleProps) => <Title {...props} />)`
  color: #232323;
  font-size: 20px !important;
  line-height: 100%;
  padding-bottom: 8px;
  font-weight: 500;
  margin-bottom: 0 !important;
`

export const StyledStep2Description = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 100%;
  padding-bottom: 35px;
  display: block;
`

export const StyledSkillsLabel = styled((props: TextProps) => <Text {...props} />)`
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 13px;
  display: block;
`

export const StyledSkillsIcon = styled((props: TextProps) => <Text {...props} />)`
  margin-right: 8px;
`

export const StyledSkillsSelect = styled((props: SelectProps<any>) => <Select {...props} />)`
  width: 100%;
  margin-bottom: 23px;

  /* && {
    .ant-select-selector {
      height: 40px !important;
    }
  } */
  /* .ant-select-selector {
    color: #232323;
    font-size: 14px;
    height: 40px;
    line-height: 14px;
    font-weight: 400;
    font-style: normal;
    padding: 14px 28px !important;
  }

  .ant-select-selection-placeholder {
    color: #232323;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    font-style: normal;
    height: 40px;
  } */
`

export const StyledPopularSkillsLabel = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 8px;
  display: block;
`

export const StyledPopularSkillsContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`

export const StyledPopularSkillTag = styled((props: TagProps) => <Tag {...props} />)`
  cursor: pointer;
  border: 1px solid #d9d9d9;
  background: white;
  color: #232323;
  font-size: 14px;
  padding: 10px 20px 10px 16px;

  &:hover {
    border-color: #232323;
    color: #232323;
  }
`

export const StyledSelectedSkillsContainer = styled((props: BoxProps) => <Box {...props} />)`
  margin-top: 24px;
`

export const StyledSelectedSkillsLabel = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 8px;
  display: block;
`

export const StyledSelectedSkillsList = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const StyledSelectedSkillTag = styled((props: TagProps) => <Tag {...props} />)`
  border: 1px solid #000000;
  background: white;
  color: #232323;
  font-size: 14px;
  padding: 10px 20px 10px 16px;

  .anticon-close {
    cursor: pointer;
    margin-left: 8px;

    &:hover {
      color: #232323;
    }
  }
`

// Step 3 Styles
export const StyledStep3StepText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 800;
  font-size: 14px !important;
  line-height: 100%;
  padding-bottom: 22px;
  display: block;
`

export const StyledStep3ContentWrapper = styled((props: BoxProps) => <Box {...props} />)``

export const StyledStep3Heading = styled((props: TitleProps) => <Title {...props} />)`
  color: #232323;
  font-size: 20px !important;
  line-height: 100%;
  padding-bottom: 8px;
  font-weight: 500;
  margin-bottom: 0 !important;
`

export const StyledStep3Description = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  padding-bottom: 34px;
  display: block;
`

export const StyledDailyNotesHeading = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 16px;
  display: block;
`

export const StyledEditorWrapper = styled((props: BoxProps) => <Box {...props} />)`
  .ql-container {
    min-height: 200px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    color: #232323;
    font-family: 'Avenir', sans-serif;
  }

  .ql-editor {
    min-height: 200px;
    padding: 16px;
    font-family: 'Avenir', sans-serif;

    &.ql-blank::before {
      color: #8c8c8c;
      font-style: normal;
      font-size: 14px;
    }
  }
  .ql-toolbar {
    background: #fafafa;
  }
  .ql-container.ql-snow {
    border-top: none;
    border-radius: 0 0 4px 4px;
  }
`

export const StyledOrDivider = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  margin: 24px 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #bfbfbf;
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`

export const StyledOrText = styled((props: TextProps) => <Text {...props} />)`
  color: #858585;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  padding: 0 17px;
`

export const StyledUploadWrapper = styled((props: BoxProps) => <Box {...props} />)`
  .ant-upload.ant-upload-select {
    width: 100%;
  }
`

export const StyledUploadBox = styled((props: BoxProps) => <Box {...props} />)`
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
`

export const StyledUploadIcon = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`

export const StyledUploadText = styled((props: TextProps) => <Text {...props} />)`
  color: #000000d9;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  padding-bottom: 4px;
  display: block;
`

export const StyledFileTypesText = styled((props: TextProps) => <Text {...props} />)`
  color: #00000073;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  padding-bottom: 4px;
  display: block;
`

export const StyledUploadedFileContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 22px 12px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  width: 100%;
`

export const StyledUploadedFileName = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  flex: 1;
`

export const StyledDeleteIcon = styled((props: BoxProps) => <Box {...props} />)`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: #ff4d4f;

  &:hover {
    color: #ff7875;
  }
`

export const StyledUploadIconInner = styled((props: TextProps) => <Text {...props} />)`
  font-size: 48px;
  color: #8c8c8c;
`

export const StyledPaperClipIcon = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  color: #8c8c8c;
`

export const StyledDeleteIconInner = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
`

// Step 4 Styles
export const StyledStep4Container = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const StyledStarIconContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  position: relative;

  @keyframes sparkle {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.3);
    }
  }

  @keyframes sparkle-delayed-1 {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.4);
    }
  }

  @keyframes sparkle-delayed-2 {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.25);
    }
  }

  svg {
    .star-large {
      animation: sparkle 2s ease-in-out infinite;
      transform-origin: 75px 64.5px;
    }

    .star-small-1 {
      animation: sparkle-delayed-1 2.5s ease-in-out infinite;
      transform-origin: 45px 31.5px;
    }

    .star-small-2 {
      animation: sparkle-delayed-2 2.2s ease-in-out infinite;
      transform-origin: 42px 76.5px;
    }
  }
`

export const StyledStep4MainHeading = styled((props: TitleProps) => <Title {...props} />)`
  color: #232323;
  font-size: 20px !important;
  line-height: 100%;
  font-weight: 500;
  padding-top: 55px;
  margin-bottom: 0 !important;
`

export const StyledStep4Description = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
  padding-top: 23px;
  max-width: 682px;
  display: block;
`

export const StyledProgressStepsContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 74px;
`

export const StyledProgressStep = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 23px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledCheckCircle = styled((props: BoxProps & { completed: boolean }) => <Box {...props} />)<{
  completed: boolean
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) => {
    return props.completed ? '#52c41a' : 'transparent'
  }};
  border: ${(props) => {
    return props.completed ? '2px solid #52c41a' : '2px solid #232323'
  }};
  position: relative;
  overflow: visible;
  transition: background 0.3s ease, border-color 0.3s ease;

  @keyframes circlePop {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes checkmarkBounce {
    0% {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    60% {
      transform: scale(1.2) rotate(10deg);
      opacity: 1;
    }
    80% {
      transform: scale(0.95) rotate(-5deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  ${(props) =>
    props.completed &&
    `
    animation: circlePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  `}

  svg {
    position: relative;
    z-index: 1;
    animation: ${(props) =>
      props.completed ? 'checkmarkBounce 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both' : 'none'};
    color: white;
    font-size: 14px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(82, 196, 26, 0.4);
    transform: translate(-50%, -50%) scale(1);
    animation: ${(props) => (props.completed ? 'ripple 0.8s ease-out 0.2s' : 'none')};
    pointer-events: none;
  }
`

export const StyledProgressStepText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  display: block;
`

// Step 4 Review & Revise Styles
export const StyledStep4StepText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 800;
  padding-bottom: 22px;
  display: block;
`

export const StyledStep4ReviewContentWrapper = styled((props: BoxProps) => <Box {...props} />)`
  /* height:calc(100vh - 385px);
  overflow-y: auto;
  // padding-bottom: 100px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  } */
`

export const StyledStep4ReviewHeading = styled((props: TitleProps) => <Title {...props} />)`
  color: #232323;
  font-size: 20px !important;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 8px;
  margin-bottom: 0 !important;
`

export const StyledStep4ReviewDescription = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 24px;
  display: block;
`

export const StyledFinalReportHeading = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 24px;
  display: block;
`

export const StyledReportNameLabel = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 12px;
  display: block;
`

export const StyledReportNameInput = styled((props: InputProps) => <Input {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  padding: 13px 13px;
  margin-bottom: 30px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;

  .ant-input {
    color: #232323;
    font-size: 16px;
    line-height: 100%;
    font-weight: 500;
    padding: 13px 24px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    &:focus,
    &.ant-input-focused {
      border-color: #232323;
      box-shadow: 0 0 0 2px rgba(35, 35, 35, 0.1);
    }
  }
`

export const StyledReportContentLabelWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`

export const StyledReportContentLabel = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px;
  line-height: 100%;
  font-weight: 500;
  display: block;
`

export const StyledReportContentWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 24px;
  position: relative;
`

export const StyledSuccessOverlay = styled((props: BoxProps) => <Box {...props} />)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`

export const StyledSuccessOverlayContent = styled((props: BoxProps) => <Box {...props} />)`
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px 0;
`

export const StyledOverlayProgressStepsContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 24px;
`

export const StyledReportContentTextArea = styled((props: TextAreaProps) => <TextArea {...props} />)`
  width: 100%;
  min-height: 300px;

  .ant-input {
    min-height: 300px;
    padding: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: #232323;
    resize: vertical;
    outline: none;
    font-family: inherit;

    &:focus,
    &.ant-input-focused {
      border-color: #232323;
      box-shadow: 0 0 0 2px rgba(35, 35, 35, 0.1);
    }
  }
`
export const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  margin: 0px 8px;
`
export const StyledFullscreenButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white;
  border: 1px solid #d9d9d9;
  color: #232323;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px !important;

  &.ant-btn {
    border-radius: 4px !important;
  }

  &:hover {
    background: black !important;
    border-color: black !important;
    color: white !important;
  }
`

export const StyledAIRevisionsSection = styled((props: BoxProps) => <Box {...props} />)`
  margin-top: 32px;
  position: relative;
`

export const StyledAIRevisionsHeading = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 16px !important;
  line-height: 100%;
  font-weight: 500;
  padding-bottom: 16px;
  display: block;
`

export const StyledAIRevisionsInput = styled((props: TextAreaProps) => <TextArea {...props} />)`
  width: 100%;
  margin-bottom: 12px;

  .ant-input {
    min-height: 80px;
    padding: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    color: #232323;
    resize: none;
    outline: none;
    font-family: inherit;

    &:focus,
    &.ant-input-focused {
      border-color: #232323;
      box-shadow: 0 0 0 2px rgba(35, 35, 35, 0.1);
    }

    &::placeholder {
      color: #8c8c8c;
    }
  }
`

export const StyledExampleSuggestions = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`

export const StyledExampleSuggestion = styled((props: TextProps) => <Text {...props} />)`
  color: #8c8c8c;
  font-size: 14px;
  line-height: 100%;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #232323;
  }
`

export const StyledReviseButtonWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`

export const StyledReviseButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border-color: black !important;
  color: white !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

export const StyledStep4ButtonContainer = styled((props: BoxProps) => <Box {...props} />)`
  background: #0000001a;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 16px;
  padding: 16px 0px;
  border-top: 1px solid #e5e5e5;
  border-radius: 0 0 4px 4px;
`

export const StyledCopyDownloadContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  gap: 14px;
`

export const StyledCopyButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border: 1px solid black !important;
  color: black !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-default {
    background: white !important;
    border-color: black !important;
    color: black !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

export const StyledDownloadButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border-color: black !important;
  color: white !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

export const StyledSaveButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border-color: black !important;
  color: white !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
`

// Fullscreen Modal Styles
export const StyledFullscreenModalContent = styled((props: BoxProps) => <Box {...props} />)`
  margin-top: 16px;
`

export const StyledFullscreenReportName = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-size: 18px;
  line-height: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
`

export const StyledFullscreenReportContent = styled((props: TextAreaProps) => <TextArea {...props} />)`
  width: 100%;
  min-height: calc(100vh - 220px);
  max-height: calc(100vh - 220px);

  .ant-input {
    min-height: calc(100vh - 220px);
    max-height: calc(100vh - 220px);
    padding: 24px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.6;
    color: #232323;
    resize: none;
    outline: none;
    font-family: inherit;
    overflow-y: auto;

    &:focus,
    &.ant-input-focused {
      border-color: #232323;
      box-shadow: 0 0 0 2px rgba(35, 35, 35, 0.1);
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;

      &:hover {
        background: #555;
      }
    }
  }
`

export const StyledIconWithRightMargin = styled((props: TextProps) => <Text {...props} />)`
  margin-right: 8px;
`

export const StyledIconWithLeftMargin = styled((props: TextProps) => <Text {...props} />)`
  margin-left: 8px;
  color: #fff;
`

export const StyledFullscreenModal = styled((props: ModalProps) => {
  const { className, ...restProps } = props
  return <Modal {...restProps} className={`${className || ''} fullscreen-modal`} />
})`
  &&.fullscreen-modal {
    .ant-modal {
      max-width: 1400px !important;
      top: 20px !important;
    }
  }
`

export const StyledReadOnlyTipTap = styled((props: TipTapProps) => <TipTap {...props} />)`
  background-color: #f5f5f5;
  cursor: default;

  .tiptap-editor {
    background-color: #f5f5f5;
    cursor: default;
    max-height: 500px;
    overflow-y: auto;
  }
`

export const StyledFullscreenReadOnlyTipTap = styled((props: TipTapProps) => <TipTap {...props} />)`
  background-color: #f5f5f5;
  cursor: default;
  min-height: 400px;

  .tiptap-editor {
    background-color: #f5f5f5;
    cursor: default;
    max-height: 500px;
    overflow-y: auto;
  }
`

// ISP Review specific styles
export const StyledRadioGroupWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 24px;
`

export const StyledSelectWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 16px;
`

export const StyledSelectLabel = styled((props: TextProps) => <Text {...props} />)`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`

export const StyledProgressReportSelect = styled((props: SelectProps<any>) => <Select {...props} />)`
  width: 100%;
`

export const StyledEmptyProgressReportsMessage = styled((props: TextProps) => <Text {...props} />)`
  color: #999;
  font-style: italic;
`

export const StyledSelectAllButton = styled((props: ButtonProps) => <Button {...props} />)`
  padding: 0 16px;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`
