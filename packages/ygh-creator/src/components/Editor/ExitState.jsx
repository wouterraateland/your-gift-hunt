import styled from "styled-components"

const ExitState = styled.div`
  width: 2em;
  height: 2em;
  border: 0.1em solid;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};
`

export default ExitState
