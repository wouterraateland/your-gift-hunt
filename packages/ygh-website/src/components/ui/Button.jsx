import styled, { css } from 'styled-components'
import { darken, opacify } from 'polished'

const Button = styled.button`
  cursor: pointer;

  display: inline-block;
  padding: .85em .7em;
  border: none;
  border-radius: ${props => props.theme.borderRadius}px;

  line-height: 1;
  vertical-align: middle;
  font-weight: bold;

  background-color: #fff;
  color: ${props => props.theme.color.emphasis};

  transition: background-color .2s ease-out;

  &:hover {
    background-color: ${darken(.1, '#fff')};
  }

  ${props => props.primary && css`
    background-color: ${props => props.theme.color.emphasis};
    color: #fff;

    &:hover {
      background-color: ${props => opacify(.3, props.theme.color.emphasis)};
      color: #fff;
    }
  `}

  ${props => props.warning && css`
    background-color: ${props => props.theme.color.warning};
    color: #fff;

    &:hover {
      background-color: ${props => darken(.1, props.theme.color.warning)};
      color: #fff;
    }
  `}

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
`

export default Button
