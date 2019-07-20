import React, { forwardRef } from "react"
import styled from "styled-components"

import BareInput from "./BareInput"
import InputContainer from "./InputContainer"

const DefaultInputContainer = styled(InputContainer)`
  padding: calc(0.5em - ${props => props.theme.borderWidth}) 0.75em;
`

const Affix = styled.span`
  display: inline-block;
  margin: 0.25em 0;
`
const Lead = styled.span`
  display: inline-block;
  margin: 0.25em 0.5em 0.25em 0;
`
const Tail = styled.span`
  display: inline-block;
  margin: 0.25em 0 0.25em 0.5em;
`

const DefaultInput = forwardRef(
  ({ lead, tail, prefix, suffix, ...otherProps }, ref) => (
    <DefaultInputContainer {...otherProps}>
      {lead && <Lead>{lead}</Lead>}
      {prefix && <Affix>{prefix}</Affix>}
      <BareInput ref={ref} {...otherProps} />
      {suffix && <Affix>{suffix}</Affix>}
      {tail && <Tail>{tail}</Tail>}
    </DefaultInputContainer>
  )
)

export default DefaultInput
