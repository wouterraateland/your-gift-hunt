import styled from "styled-components"

const TypeContainer = styled.div`
  width: 3em;
  margin-right: 1em;
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: ${props => props.theme.boxShadow.medium};

  background: #444;
  color: #fff;
`

export default TypeContainer
