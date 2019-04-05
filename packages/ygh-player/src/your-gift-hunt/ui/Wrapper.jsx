import styled, { css } from "styled-components"

const Wrapper = styled.div`
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;

  flex-grow: 1;

  ${props =>
    !props.nopadding &&
    css`
      padding-left: 2rem;
      padding-right: 2rem;
    `}

  ${props =>
    props.small &&
    css`
      max-width: 30rem;
    `}
  ${props =>
    props.medium &&
    css`
      max-width: 45rem;
    `}
  ${props =>
    props.xlarge &&
    css`
      max-width: 75rem;
    `}
`

export default Wrapper
