import styled, { css } from 'styled-components'

const Field = styled.div`
  ${props => !props.block && css`
    display: inline-block;
    & { padding: .79em; }
  `}

  padding: .79em 0;
`

export default Field
