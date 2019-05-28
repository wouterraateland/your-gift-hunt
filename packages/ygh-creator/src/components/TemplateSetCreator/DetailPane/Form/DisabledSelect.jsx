import React from "react"
import styled from "styled-components"

import LabelText from "your-gift-hunt/ui/Input/LabelText"

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
    <LabelText label={label} />
  </Label>
)

export default DisabledSelect
