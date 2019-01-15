import styled, { css } from 'styled-components'

const Scene = styled.div`
  position: absolute;
  left: calc(50% - ${props => props.left}em);
  top: calc(50% - 3.5em - ${props => props.top}em);

  width: ${props => props.width}em;
  height: ${props => props.height}em;

  transform: translate(-50%, -50%);

  ${props => props.debug && css`
    &::after {
      content: '';
      position: absolute;
      left: ${props => props.left}em;
      top: ${props => props.top}em;
      width: 100%;
      height: 100%;
      background: #f129;
    }
  `}
`

export default Scene
