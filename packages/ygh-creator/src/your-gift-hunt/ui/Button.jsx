import styled, { css } from 'styled-components'
import { darken, opacify } from 'polished'

const Button = styled.button`
  cursor: pointer;

  display: inline-block;
  padding: .85em .7em;
  border-radius: ${props => props.theme.borderRadius}px;

  line-height: 1;
  vertical-align: middle;
  font-weight: bold;

  transition: background-color .2s ease-out;

  ${props => {
    let color;

    switch (props.color) {
      case 'accent': color = darken(.1, props.theme.color.accent); break;
      case 'error': color = props.theme.color.error; break;
      case 'warning': color = props.theme.color.warning; break;
      case 'success': color = props.theme.color.success; break;
      default: color = props.theme.color.emphasis; break;
    }

    return props.importance === 'primary'
      ? css`
          border: none;

          background-color: ${color};
          color: ${props.theme.color.emphasis};

          &:hover {
            background-color: ${opacify(.3, darken(.1, color))};
          }
        `
      : css`
          border: .1em solid;

          background-color: #fff;
          color: ${color};

          &:hover {
            background-color: ${darken(.1, '#fff')};
          }
        `
  }}

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
`

export default Button
