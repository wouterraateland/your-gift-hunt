import "typeface-playfair-display"
import "typeface-montserrat"

import React, { useMemo } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { opacify, transparentize } from "polished"
import useWindowSize from "hooks/useWindowSize"

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
    heading: '"Playfair Display", serif'
  }
}

export const StaticGlobalStyle = createGlobalStyle`
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

    color: ${opacify(0.1, theme.color.text)};

    transition: color .2s ease-out;

    &:hover {
      color: ${opacify(0.3, theme.color.text)};
    }
  }

  img, svg {
    max-width: 100%;
  }
`

const VariableGlobalStyle = () => {
  const { height } = useWindowSize()

  const GlobalStyle = useMemo(
    () => createGlobalStyle`
    :root {
      --vh: ${props => props.vh}px
    }
  `,
    [height]
  )

  return <GlobalStyle vh={height * 0.01} />
}

const GooFilter = () => (
  <svg style={{ display: "none" }}>
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <filter id="fancy-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
)

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <VariableGlobalStyle />
      <StaticGlobalStyle />
      <GooFilter />
      {children}
    </>
  </ThemeProvider>
)
