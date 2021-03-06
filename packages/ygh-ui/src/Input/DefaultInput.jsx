import React, { forwardRef } from "react"
import styled from "styled-components"

import BareInput from "./BareInput"
import InputContainer from "./InputContainer"

const DefaultInputContainer = styled(InputContainer)`
  padding: ${props => {
    switch (props.size) {
      case "tiny":
        return `0 0.25rem`
      case "small":
        return `0.25rem 0.5rem`
      default:
      case "medium":
        return `0.5rem 0.75rem`
      case "large":
        return `0.75rem 1rem`
    }
  }};
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
  (
    { lead, trail, prefix, suffix, tabIndex, value, onChange, ...otherProps },
    ref
  ) => (
    <DefaultInputContainer {...otherProps}>
      {lead && <Lead>{lead}</Lead>}
      {prefix && <Affix>{prefix}</Affix>}
      <BareInput
        ref={ref}
        tabIndex={tabIndex}
        style={{ textAlign: suffix && !prefix ? "right" : undefined }}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      {suffix && <Affix>{suffix}</Affix>}
      {trail && <Trail>{trail}</Trail>}
    </DefaultInputContainer>
  )
)

export default DefaultInput
