import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { opacify, transparentize } from "polished"

const theme = {
  color: {
    text: "#0009",
    emphasis: "#000d",
    primary: "#3f51b5",
    secondary: "#ffd65a",
    error: "#d34d4e",
    warning: "#f7a600",
    success: "#41ac57"
  },
  borderRadius: "0.25em",
  boxShadow: {
    small: "0 0.25rem 0.75rem -0.25rem #0004",
    medium: "0 0.5rem 1.5rem -0.5rem #0006",
    large: "0 1rem 3rem -1rem #0008"
  },
  columns: {
    count: 12,
    gap: "0.5em"
  },
  font: {
    copy: "Montserrat, sans-serif",
    heading: '"Playfair Display", serif'
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

    background:
      linear-gradient(-30deg, ${
        theme.color.secondary
      } 30vw, #EBEDF5 30vw, #EBEDF5 40vw, transparent 40vw) no-repeat bottom right,
      linear-gradient(150deg, ${
        theme.color.secondary
      } 30vw, #EBEDF5 30vw, #EBEDF5 40vw, transparent 40vw) no-repeat top left;

    background-color: ${transparentize(0.95, theme.color.primary)};
    color: ${theme.color.text};
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
    font-family: "Playfair Display", serif;
  }

  strong {
    color: ${theme.color.emphasis};
  }

  hr {
    clear: both;
    height: .1em;
    background: linear-gradient(90deg, transparent, ${transparentize(
      0.5,
      theme.color.text
    )}, transparent);
  }

  a {
    display: inline-block;

    text-decoration-color: ${transparentize(0.5, theme.color.text)};

    color: ${theme.color.text};

    transition: color .2s ease-out;

    &:hover {
      color: ${opacify(0.3, theme.color.text)};
    }
  }

  img, svg {
    max-width: 100%;
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
