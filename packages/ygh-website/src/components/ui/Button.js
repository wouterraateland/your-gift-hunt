import { memo } from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
  cursor: pointer;

  border: none;
  border-radius: .5em;

  padding: 1em;
  font-weight: bold;
  font-size: 1.2em;

  box-shadow:
    inset 0 -.5rem 1rem -.5rem rgba(0, 0, 0, .1),
    0 .5rem 1.5rem -.5rem rgba(0, 0, 0, .1);

  background-color: #fdd835;
  color: #fff;

  &:hover {
    background-color: #fbc02d;
  }

  &:focus, &:active {
    outline: none;
  }

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
`

Button.displayName = 'Button'

export default memo(Button)
