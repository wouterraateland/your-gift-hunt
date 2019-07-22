import React, { forwardRef } from "react"
import styled from "styled-components"

import BareInput from "./BareInput"
import InputContainer from "./InputContainer"

const DefaultInputContainer = styled(InputContainer)`
  padding: calc(0.5em - ${props => props.theme.borderWidth}) 0.75em;
`

const Affix = styled.span`
  margin: 0.25em 0;
  color: ${props => props.theme.color.caption};
`
const Lead = styled.span`
  margin: 0.25em 0.5em 0.25em 0;
`
const Trail = styled.span`
  margin: 0.25em 0 0.25em 0.5em;
`

const DefaultInput = forwardRef(
  ({ lead, trail, prefix, suffix, tabIndex, ...otherProps }, ref) => (
    <DefaultInputContainer {...otherProps}>
      {lead && <Lead>{lead}</Lead>}
      {prefix && <Affix>{prefix}</Affix>}
      <BareInput
        ref={ref}
        tabIndex={tabIndex}
        style={{ textAlign: suffix && !prefix ? "right" : undefined }}
        {...otherProps}
      />
      {suffix && <Affix>{suffix}</Affix>}
      {trail && <Trail>{trail}</Trail>}
    </DefaultInputContainer>
  )
)

export default DefaultInput
