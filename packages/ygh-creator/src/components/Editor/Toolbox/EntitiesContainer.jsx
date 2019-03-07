import styled, { css } from "styled-components"

const EntitiesContainer = styled.div`
  width: 20em;
  max-width: calc(100vw - 2em);
  max-height: calc(100vh - 6em);
  margin-right: 1em;
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #444;
  color: #fff;

  transition: transform 0.2s ease-out, opacity 0.2s ease-out;

  ${props =>
    !props.isVisible &&
    css`
      pointer-events: none;
      opacity: 0;
      transform: translate(-2em, 0);
    `}
`

export default EntitiesContainer
