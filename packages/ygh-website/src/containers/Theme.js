import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { opacify, transparentize } from 'polished'

const theme = {
  color: {
    text:       '#0009',
    emphasis:   '#000d',
    primary:    '#3f51b5',
    accent:     '#ffd65a',
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

  html {
    @media (max-width: 30em) {
      font-size: 90%;
    }

    @media (min-width: 30em) and (max-width: 64em) {
      font-size: calc(90% + ((112.5 - 90) / 100) * (100vw - 30rem) / (64 - 30));
    }

    @media (min-width: 64em) {
      font-size: 112.5%;
    }
  }

  body {
    overflow-x: hidden;

    padding: 0;
    margin: 0;

    background-color: ${transparentize(.95, theme.color.primary)};
    color: ${theme.color.text};
  }

  form {
    margin-left: -.79em;
    margin-right: -.79em;
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
    font-weight: normal;
  }

  strong {
    color: ${theme.color.emphasis};
  }

  hr {
    clear: both;
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

  article {
    max-width: 35em;
  }

  article a {
    text-decoration: underline;
    text-decoration-color: ${transparentize(.5, theme.color.text)};
  }

  svg {
    max-width: 100%;
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
