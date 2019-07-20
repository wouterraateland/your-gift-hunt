import React from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import useOptions from "./useOptions"

const Label = styled.label`
  display: flex;
  margin: 0.75em 0;
`

const Input = styled.input`
  margin: 0 1em 0 0;
`

const Meta = styled.div``

const LabelText = styled.strong`
  display: block;
`

const InfoText = styled.small``

const DefaultOptions = props => {
  const getOptionProps = useOptions(props)

  const type = props.isMulti ? "checkbox" : "radio"
  const labelProps = _.keep(["disabled"])(props)

  return props.options.map(option => (
    <Label key={option.value} {...labelProps}>
      <Input type={type} {...getOptionProps(option)} />
      <Meta>
        <LabelText>{option.label}</LabelText>
        {option.info && <InfoText>{option.info}</InfoText>}
      </Meta>
    </Label>
  ))
}

export default DefaultOptions
