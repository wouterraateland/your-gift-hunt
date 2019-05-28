import styled, { css } from "styled-components"

const TypeContainer = styled.div`
  width: 3em;
  margin-right: 1em;
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #444;
  color: #fff;

  @media (max-width: 25em) {
    transition: margin-left 0.2s ease-out;

    ${props =>
      props.typeSelected &&
      css`
        margin-left: -4em;
      `}
  }
`

export default TypeContainer
