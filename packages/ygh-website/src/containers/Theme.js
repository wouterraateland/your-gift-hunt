import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { opacify, transparentize } from 'polished'

const theme = {
  color: {
    text:       '#0009',
    emphasis:   '#000d',
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

    color: ${theme.color.text};
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

  hr {
    height: .1em;
    background: linear-gradient(90deg, transparent, ${transparentize(.5, theme.color.text)}, transparent);
  }

  a {
    display: inline-block;

    text-decoration: none;

    color: ${theme.color.text};

    transition: color .2s ease-out;

    &:hover {
      color: ${opacify(.3, theme.color.text)};
    }
  }

  article a {
    text-decoration: underline;
    text-decoration-color: ${transparentize(.5, theme.color.text)};
  }

  article {
    font-size: 21px;

    @media (max-width: 720px) {
      font-size: 18px;
    }
  }

  svg {
    max-width: 100%;

    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.58em;
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
