import styled, { css } from 'styled-components'

const Slot = styled.div`
  float: left;
  width: ${props => props.width}%;
  height: ${props => props.height}%;

  border: 1px solid transparent;

  ${props => props.challenge.completed && css`
    background: #fff url(${props.image}) no-repeat center / cover;
  `}
`
Slot.displayName = 'Slot'

export default Slot
