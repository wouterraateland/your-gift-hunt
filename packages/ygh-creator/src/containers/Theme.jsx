import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { opacify, transparentize } from "polished"
import { Theme as BaseTheme } from "ygh-ui"

const extendTheme = base => ({
  ...base,
  font: {
    ...base.font,
    heading: "Montserrat, sans-serif"
  }
})

export const GlobalStyles = createGlobalStyle`
  html, body, #app-root {
    height: 100%;
  }

  html {
    font-size: 100%;
  }

  body {
    overflow-x: hidden;
    background-color: #f9f9f9;
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
  <BaseTheme>
    <ThemeProvider theme={extendTheme}>
      <>
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  </BaseTheme>
)
