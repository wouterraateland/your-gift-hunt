import styled, { css } from "styled-components"

const Field = styled.div`
  ${props =>
    !props.block &&
    css`
      display: inline-block;
      & {
        padding: 0.79em;
      }
    `}

  max-width: 100%;
  padding: 0.79em 0;

  &:last-child {
    padding-bottom: 0;
  }
`

export default Field
