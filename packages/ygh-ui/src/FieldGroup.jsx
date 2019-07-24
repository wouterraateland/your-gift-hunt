import styled, { css } from "styled-components"

const FieldGroup = styled.div`
  ${props =>
    !props.block &&
    css`
      display: inline-block;
      & {
        margin: 1em;
      }
    `}

  max-width: 100%;
  margin: 1em 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:empty {
    display: none;
  }
`

export default FieldGroup
