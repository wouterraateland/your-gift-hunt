import styled from "styled-components"

const TypeContainer = styled.div`
  width: 12em;
  margin-right: 1em;
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #444;
  color: #fff;

  transition: transform 0.2s ease-out, opacity 0.2s ease-out;

  transform: translate(${props => (props.isVisible ? 0 : "-2em")}, 0);
  opacity: ${props => (props.isVisible ? 1 : 0)};
`

export default TypeContainer
