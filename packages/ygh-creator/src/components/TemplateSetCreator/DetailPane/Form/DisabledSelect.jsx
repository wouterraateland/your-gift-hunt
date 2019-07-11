import React from "react"
import styled from "styled-components"
import { transparentize } from "polished"

const LabelText = styled.span`
  pointer-events: none;

  position: absolute;
  top: -1.7em;
  left: 0;

  color: ${props => transparentize(0.2, props.theme.color.text)};

  font-size: 0.7em;

  transition: left 0.2s ease-out, top 0.2s ease-out, font-size 0.2s ease-out;
`

const Label = styled.div`
  position: relative;
`

const Option = styled.span`
  display: inline-block;
  margin: 0 0.5em 0.5em 0;
`

const DisabledSelect = ({ label, isMulti, value, options, placeholder }) => (
  <Label>
    {isMulti ? (
      value.length ? (
        options
          .filter(option => value.some(v => v === option.value))
          .map(option => <Option key={option.value}>{option.label}</Option>)
      ) : placeholder ? (
        placeholder
      ) : (
        <em>None</em>
      )
    ) : value && options.some(option => option.value === value) ? (
      options.find(option => option.value === value).label
    ) : placeholder ? (
      placeholder
    ) : (
      <em>None</em>
    )}
    <LabelText>{label}</LabelText>
  </Label>
)

export default DisabledSelect
