import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { darken } from 'polished'

const theme = {
  color: {
    text:       '#0007',
    emphasis:   '#000c',
    accent:     '#ffcc66',
    error:      '#d34d4e',
    warning:    '#f7a600',
    success:    '#41ac57',
  },
  borderRadius: 0,
  columns: {
    count: 12,
    gap: '2rem',
  }
}

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    vertical-align: top;

    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;

    line-height: 1.58;
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
  }

  strong {
    color: ${theme.color.emphasis};
  }

  a {
    display: inline-block;

    text-decoration: none;
    color: ${theme.color.accent};

    transition: color .2s ease-out;

    &:hover {
      color: ${darken(.1, theme.color.accent)};
    }
  }

  article {
    font-size: 21px;

    @media (max-width: 720px) {
      font-size: 18px;
    }
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  .draggable {
    will-change: transform, z-index;
    touch-action: none;
    position: absolute;

    opacity: 0;

    animation: fadeIn 1s 1s ease-out forwards running;
  }
`

export default ({ children }) =>
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
