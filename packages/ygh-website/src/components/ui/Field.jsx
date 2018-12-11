import styled, { css } from 'styled-components'

const Field = styled.div`
  ${props => !props.block && css`
    display: inline-block;
    & { margin: .79em; }
  `}

  margin: .79em 0;
`

export default Field
