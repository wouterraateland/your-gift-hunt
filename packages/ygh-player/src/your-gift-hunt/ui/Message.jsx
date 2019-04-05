import styled from "styled-components"

export const DefaultMessage = styled.span`
  vertical-align: middle;
  color: ${props => props.theme.color.text};
`
export const SuccessMessage = styled(DefaultMessage)`
  color: ${props => props.theme.color.success};
`
export const WarningMessage = styled(DefaultMessage)`
  color: ${props => props.theme.color.warning};
`
export const ErrorMessage = styled(DefaultMessage)`
  color: ${props => props.theme.color.error};
`

export default {
  Default: DefaultMessage,
  Success: SuccessMessage,
  Warning: WarningMessage,
  Error: ErrorMessage
}
