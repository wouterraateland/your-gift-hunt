import styled from 'styled-components'

const Item = styled.div`
  position: absolute;
  left: 0; top: 0;
  right: 0; bottom: 0;

  touch-action: none;

  margin: auto;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }
`

export default Item
