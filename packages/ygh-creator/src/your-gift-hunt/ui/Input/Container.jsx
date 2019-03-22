import styled from "styled-components"
import _ from "utils"

const Container = styled.div`
  display: inline-block;
  max-width: 100%;

  line-height: 1;
  vertical-align: top;

  ${_.blockStyles}
`

Container.displayName = "InputContainer"

export default Container
