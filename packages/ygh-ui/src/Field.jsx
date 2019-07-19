import React from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import SingleInput from "./Input/SingleInput"

const Label = styled.label`
  display: inline-block;
  max-width: 100%;

  line-height: 1;
  vertical-align: top;

  ${_.blockStyles}
`
Label.displayName = "Label"

const LabelText = styled.span`
  color: ${props => props.theme.color.caption};
  font-size: 0.7em;
`
LabelText.displayName = "LabelText"

const Info = styled.small`
  margin-left: 0.5em;
  vertical-align: baseline;
`
Info.displayName = "Info"

const ErrorMessage = styled.small`
  display: block;
  margin: 0.25em 0 0.5em;

  color: ${props => props.theme.color.error};
`
ErrorMessage.displayName = "ErrorMessage"

const Field = ({
  label,
  info,
  component: Component = SingleInput,
  ...otherProps
}) => (
  <Label disabled={otherProps.disabled} block={otherProps.block}>
    <LabelText>
      {label}
      {info && <Info>({info})</Info>}
    </LabelText>
    <Component {...otherProps} />
    {!!otherProps.error && <ErrorMessage>{otherProps.error}</ErrorMessage>}
  </Label>
)

export default Field
