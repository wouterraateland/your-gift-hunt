import React from "react"
import styled from "styled-components"

const LabelText = styled.span`
  display: block;
  font-size: 0.75rem;

  color: ${props => props.theme.color.caption};
`

const Label = styled.div`
  position: relative;
`

const Option = styled.span`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
`

const DisabledSelect = ({ label, isMulti, value, options, placeholder }) => (
  <Label>
    <LabelText>{label}</LabelText>
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
  </Label>
)

export default DisabledSelect
