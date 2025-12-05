import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: smooth;
  }
  .sider-scrollbar-styling::-webkit-scrollbar-thumb {
      background: transparent; 
    
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }

  .ant-form-item-required::before {
    display: none !important;
  }
  
  .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: #E0E0E0;
  }

  .ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected >.ant-table-cell {
    background-color: #E0E0E0;
  }
  
  .ant-table-wrapper .ant-table-ping-right .ant-table-cell-fix-right-first::after {
    box-shadow: none;
  }

  &&.ant-input-outlined:focus,
  .ant-input-outlined:focus-within {
    box-shadow: none !important;
  }

  &&.ant-input-outlined:focus-within {
    box-shadow: none !important;
  }

  &&.ant-select-selector {
    box-shadow: none !important;
  }

  body {
    font-size: 14px;
    overflow: hidden;
    width: 100% !important;
  }
`
