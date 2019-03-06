import styled from "styled-components"

const ExitState = styled.div`
  position: absolute;

  width: 2em;
  height: 2em;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};

  background-color: ${props => props.theme.color.text};

  transform: translate(-50%, -50%);
`

export default ExitState
