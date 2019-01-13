import React from 'react'
import styled, { css } from 'styled-components'

import * as _Camera from './Camera'
import * as _Computer from './Computer'
import * as _Mailbox from './Mailbox'
import * as _SafeWithCode from './SafeWithCode'
import * as _SafeWithKeyhole from './SafeWithKeyhole'

const Screen = styled.div`
  position: fixed;
  z-index: 2;

  background: #0002;

  transition: opacity .2s ease-out;

  ${props => !props.isOpen && css`
    pointer-events: none;
    opacity: 0;
  `}
`

const createScreen = ({ default: Component }) => props => {
  return (
    <Screen isOpen={props.isOpen}>
      <Component {...props} />
    </Screen>
  )
}

export default createScreen

export const SafeWithCode = createScreen(_SafeWithCode)
export const Computer = createScreen(_Computer)
export const Mailbox = createScreen(_Mailbox)
export const SafeWithKeyhole = createScreen(_SafeWithKeyhole)
export const Camera = createScreen(_Camera)
