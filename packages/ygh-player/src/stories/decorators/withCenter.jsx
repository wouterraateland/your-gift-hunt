import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'

const Center = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.isItem && css`
    &::before {
      content: '';

      position: absolute;
      left: 0; top: 0;
      right: 0; bottom: 0;

      margin: auto;

      width: 2em;
      height: 2em;

      background-color: #0001;
    }
  `}
`

const withCenter = isItem => story => (
  <Center isItem={isItem}>
    {story()}
  </Center>
)

export default withCenter
