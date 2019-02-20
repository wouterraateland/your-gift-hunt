import styled, { css } from "styled-components"

const Container = styled.div`
  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;

  line-height: 1;
  vertical-align: top;

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}
`

Container.displayName = "InputContainer"

export default Container
