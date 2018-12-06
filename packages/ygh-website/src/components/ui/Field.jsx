import styled, { css } from 'styled-components'

const Field = styled.div`
  ${props => !props.block && css`
    display: inline-block;
    margin-right: 1.58em;
  `}

  margin-bottom: 1.58em;
`

export default Field
