import styled, { css } from "styled-components"

const FieldGroup = styled.div`
  ${props =>
    !props.block &&
    css`
      display: inline-block;
      & {
        padding: 1em;
      }
    `}

  max-width: 100%;
  padding: 1em 0;

  &:last-of-type {
    padding-bottom: 0;
  }

  &:empty {
    display: none;
  }
`

export default FieldGroup
