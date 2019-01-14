import styled from 'styled-components'

const Scene = styled.div`
  position: absolute;
  left: calc(50% - ${props => props.left}em);
  top: calc(50% - ${props => props.top}em);

  width: ${props => props.width}em;
  height: ${props => props.height}em;

  transform: translate(-50%, -50%);
`

export default Scene
