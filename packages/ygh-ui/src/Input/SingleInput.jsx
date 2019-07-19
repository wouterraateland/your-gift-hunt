import React, { forwardRef } from "react"
import styled from "styled-components"

import BareInput from "./BareInput"
import InputContainer from "./InputContainer"

const SingleInputContainer = styled(InputContainer)`
  padding: calc(0.5em - ${props => props.theme.borderWidth}) 0.75em;
`

const Prefix = styled.span`
  display: inline-block;
  margin: 0.25em 0.5em 0.25em 0;
`
const Suffix = styled.span`
  display: inline-block;
  margin: 0.25em 0 0.25em 0.5em;
`

const SingleInput = forwardRef(({ prefix, suffix, ...otherProps }, ref) => (
  <SingleInputContainer {...otherProps}>
    {prefix && <Prefix>{prefix}</Prefix>}
    <BareInput ref={ref} {...otherProps} />
    {suffix && <Suffix>{suffix}</Suffix>}
  </SingleInputContainer>
))

export default SingleInput
