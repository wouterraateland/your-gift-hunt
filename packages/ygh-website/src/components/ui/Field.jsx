import styled, { css } from 'styled-components'

const Field = styled.div`
  ${props => !props.block && css`
    display: inline-block;
    & { padding: .79em; }
  `}

  max-width: 100%;
  padding: .79em 0;
`

export default Field
