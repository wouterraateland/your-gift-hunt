import styled from 'styled-components'

export { default as Logo } from './Logo'
export { default as Twitter } from './Twitter'
export { default as Facebook } from './Facebook'

const Icon = styled.svg`
  height: ${props => props.size || 1}em;

  fill: currentColor;
  stroke: ${props => props.stroke ? 'currentColor' : 'transparent'};
`

export default Icon
