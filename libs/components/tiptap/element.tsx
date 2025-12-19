import { Box } from '@app/components'
import styled from 'styled-components'

export const EditorContainer = styled(Box)`
  .tiptap-editor {
    padding: 12px;
    min-height: 200px;
    overflow-y: auto;
    outline: none;

    p {
      margin: 0 0 8px 0;

      &:last-child {
        margin-bottom: 0;
      }

      &.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: #bfbfbf;
        pointer-events: none;
        height: 0;
      }
    }

    ul,
    ol {
      padding-left: 24px;
      margin: 8px 0;
    }

    li {
      margin: 4px 0;
    }

    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    u {
      text-decoration: underline;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 16px 0 8px 0;
      font-weight: 600;
      line-height: 1.2;

      &:first-child {
        margin-top: 0;
      }
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.25em;
    }

    h4 {
      font-size: 1.1em;
    }

    h5 {
      font-size: 1em;
    }

    h6 {
      font-size: 0.9em;
    }

    hr {
      margin: 16px 0;
      border: none;
      border-top: 1px solid #d9d9d9;
    }
  }

  .tiptap-toolbar {
    display: flex;
    gap: 2px;
    padding: 4px;
    border: 1px solid #d9d9d9;
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    background-color: #fafafa;
    flex-wrap: wrap;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      padding: 0;
      border: 1px solid transparent;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      color: #595959;
      transition: all 0.2s;

      svg {
        font-size: 16px;
      }

      &:hover {
        background-color: #f0f0f0;
        border-color: #d9d9d9;
      }

      &.is-active {
        background-color: #e6f7ff;
        border-color: #91d5ff;
        color: #0958d9;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .heading-dropdown-button {
      width: auto;
      min-width: 80px;
      padding: 0 8px;
      font-size: 14px;
      justify-content: space-between;
    }
  }

  .tiptap-editor-wrapper {
    border: 1px solid #d9d9d9;
    border-radius: 0 0 6px 6px;

    &.no-toolbar {
      border-radius: 6px;
    }
  }
`
