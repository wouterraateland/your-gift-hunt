import styled, { css } from 'styled-components'
import { darken } from 'polished'

const Button = styled.button`
  display: inline-block;
  padding: .5em 1em;
  margin: .5em 0;
  border: none;
  border-radius: ${props => props.theme.borderRadius}px;

  text-decoration: none;
  font-size: larger;
  vertical-align: middle;

  box-shadow: 0 4px 12px -4px #0004;

  background-color: #fff;
  color: ${props => props.theme.color.emphasis};

  transition-property: box-shadow, background-color, transform;
  transition-duration: .2s;
  transition-timing-function: ease-out;

  &:hover {
    box-shadow: 0 8px 24px -8px #0008;
    background-color: #fff;
    color: ${props => props.theme.color.emphasis};
    transform: scale(1.05);
  }

  ${props => props.primary && css`
    background-color: ${props => props.theme.color.accent};
    color: #fff;

    &:hover {
      background-color: ${props => darken(.1, props.theme.color.accent)};
      color: #fff;
    }
  `}
`

export default Button
