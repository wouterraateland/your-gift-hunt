import styled from "styled-components"
import ImageInput from "components/ImageInput"

const AvatarInput = styled(ImageInput)`
  width: 10em;
  height: 10em;
  margin: 2em auto;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.medium};
`

export default AvatarInput
