import styled from "styled-components"

const ErrorMessage = styled.small`
  display: block;
  margin: 0.25em 0 0.5em;

  color: ${props => props.theme.color.error};
`

export default ErrorMessage
