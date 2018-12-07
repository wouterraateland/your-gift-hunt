import styled from 'styled-components'

export { default as Logo } from './Logo'
export { default as Twitter } from './Twitter'
export { default as Facebook } from './Facebook'

const Icon = styled.svg`
  height: ${props => props.size}em;

  fill: ${props => props.colorFill ? 'currentColor' : 'transparent'};
  stroke: ${props => props.colorStroke ? 'currentColor' : 'transparent'};
`

Icon.defaultProps = {
  size: 1,
  colorFill: true,
  colorStroke: false,
}

export default Icon
