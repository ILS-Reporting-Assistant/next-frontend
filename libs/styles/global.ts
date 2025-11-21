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

  body {
    font-size: 14px;
    overflow: hidden;
    width: 100% !important;
  }
`
