import "typeface-playfair-display"
import "typeface-montserrat"

import React, { useMemo } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { transparentize } from "polished"
import { useWindowSize } from "ygh-hooks"

const theme = {
  color: {
    caption: "#0007",
    text: "#0009",
    emphasis: "#000d",
    primary: "#05f",
    secondary: "#ffd65a",
    error: "#e02d51",
    warning: "#f9673e",
    success: "#3dc169"
  },
  borderWidth: "1px",
  borderRadius: "0.25rem",
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
    font-family: ${props => props.theme.font.copy};

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

    background-color: ${props =>
      transparentize(0.95, props.theme.color.primary)};
    color: ${theme.color.text};
  }

  input, textarea, select, button {
    font: inherit;
    background: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${theme.color.emphasis};
    font-family: ${props => props.theme.font.heading};
  }

  strong {
    color: ${props => props.theme.color.emphasis};
    font-weight: 600;
  }

  small {
    font-size: .75rem;
    line-height: 1rem;
  }

  hr {
    clear: both;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props =>
      transparentize(0.5)(props.theme.color.text)}, transparent);
  }

  a {
    display: inline-block;

    text-decoration: none;

    color: ${props => props.theme.color.primary};

    &:hover {
      text-decoration: underline;
    }

    &:focus {
      outline: none;
      text-decoration: underline;
      background-color: ${props =>
        transparentize(0.5)(props.theme.color.primary)};
    }
  }

  img, svg {
    max-width: 100%;
  }

  blockquote {
    padding-left: .5em;
    margin: .5em 0;
    border-left: .5em solid #0002;

    font-style: italic;
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

export default ({ children, extendTheme = x => x }) => (
  <ThemeProvider theme={extendTheme(theme)}>
    <>
      <VariableGlobalStyle />
      <StaticGlobalStyle />
      <GooFilter />
      {children}
    </>
  </ThemeProvider>
)
