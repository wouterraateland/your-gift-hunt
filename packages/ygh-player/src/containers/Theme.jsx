import 'typeface-playfair-display'
import 'typeface-montserrat'

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
    font-family: Montserrat, sans-serif;

    @media (max-width: 20em) {
      font-size: 70%;
    }

    @media (min-width: 20em) and (max-width: 30em) {
      font-size: calc(70% + ((100 - 70) / 100) * (100vw - 20rem) / (30 - 20));
    }

    @media (min-width: 30em) {
      font-size: 100%;
    }
  }

  body {
    padding: 0;
    margin: 0;
    color: ${theme.color.text};
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
    font-weight: normal;
    font-family: "Playfair Display", serif;
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

    text-decoration-color: ${transparentize(.5, theme.color.text)};

    color: ${theme.color.text};

    transition: color .2s ease-out;

    &:hover {
      color: ${opacify(.3, theme.color.text)};
    }
  }

  img, svg {
    max-width: 100%;
  }
`

export default ({ children }) =>
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
