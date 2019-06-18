import styled from "styled-components"

const LogicView = styled.div`
  cursor: pointer;

  display: flex;
  width: 4em;
  height: 4em;
  margin: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  background: #0001;

  align-items: center;
  justify-content: center;
  text-align: center;
`

export default LogicView
