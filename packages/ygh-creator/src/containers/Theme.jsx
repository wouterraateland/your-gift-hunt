import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { opacify, transparentize } from "polished"

const theme = {
  color: {
    text: "#0009",
    emphasis: "#000d",
    primary: "#3f51b5",
    accent: "#ffd65a",
    error: "#d34d4e",
    warning: "#f7a600",
    success: "#41ac57"
  },
  borderRadius: 0,
  columns: {
    count: 12,
    gap: ".5em"
  }
}

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    vertical-align: top;

    box-sizing: border-box;
  }

  html, body, #app-root {
    height: 100%;
  }

  html {
    font-family: Montserrat, sans-serif;
  }

  body {
    overflow-x: hidden;

    padding: 0;
    margin: 0;

    background-color: ${transparentize(0.95, theme.color.primary)};
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
    font-family: "Playfair Display", serif;
  }

  strong {
    color: ${theme.color.emphasis};
  }

  hr {
    clear: both;
    height: .2em;
    background: ${transparentize(0.5, theme.color.text)};
    border: none;
  }

  a, u {
    display: inline-block;

    text-decoration-color: ${transparentize(0.5, theme.color.text)};

    color: ${theme.color.text};

    transition: color .2s ease-out;

    a:hover {
      color: ${opacify(0.3, theme.color.text)};
    }
  }

  blockquote {
    padding-left: .5em;
    margin: 1em 0;

    border-left: .5em solid #0002;
  }

  img, svg {
    max-width: 100%;
  }

  #modal-root {
    pointer-events: none;

    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    z-index: 100;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    transition: background-color .2s ease-out;

    & > * {
      pointer-events: auto;
    }

    &:not(:empty) {
      background-color: #0004;
    }
  }
`

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
)
