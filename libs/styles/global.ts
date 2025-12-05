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

  .ant-table-wrapper .ant-table-tbody > tr > td,
  .ant-table-wrapper .ant-table-thead > tr > th {
    height: 50px !important;
    padding: 12px 16px !important; 
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

  /* Global input font size */
  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-number,
  .ant-input-search .ant-input,
  .ant-select-selector,
  .ant-picker-input input,
  .ant-input-group .ant-input,
  textarea.ant-input,
  .ant-input-group-wrapper .ant-input,
  .ant-input-number-input,
  .ant-input-affix-wrapper .ant-input {
    font-size: 14px !important;
  }

  body {
    font-size: 14px;
    overflow: hidden;
    width: 100% !important;
  }
`
