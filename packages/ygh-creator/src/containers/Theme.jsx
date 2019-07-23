import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { opacify, transparentize } from "polished"

const theme = {
  color: {
    caption: "#0007",
    text: "#0009",
    emphasis: "#000d",
    primary: "#3f51b5",
    secondary: "#ffd65a",
    error: "#e02d51",
    warning: "#f9673e",
    success: "#3dc169"
  },
  borderWidth: "2px",
  borderRadius: "0.25em",
  boxShadow: {
    small: "0 0.25rem 0.75rem -0.25rem #0004",
    medium: "0 0.5rem 1.5rem -0.5rem #0006",
    large: "0 1rem 3rem -1rem #0009"
  },
  columns: {
    count: 12,
    gap: "0.5em"
  },
  font: {
    copy: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif"
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
    font-family: ${theme.font.copy};
  }

  body {
    overflow-x: hidden;

    padding: 0;
    margin: 0;

    background-color: ${transparentize(0.95, theme.color.primary)};
    color: ${theme.color.text};
  }

  form {
    margin-left: -1em;
    margin-right: -1em;
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
    font-weight: normal;
    font-family: ${theme.font.heading};
  }

  strong {
    color: ${theme.color.emphasis};
    font-weight: 600;
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
    margin: .5em 0;

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
