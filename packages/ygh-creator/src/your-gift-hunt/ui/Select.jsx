import React from "react"
import styled from "styled-components"
import Select from "react-select"

import LabelText from "./Input/LabelText"
import ErrorMessage from "./Input/ErrorMessage"

const Label = styled.label`
  position: relative;

  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;
  margin-top: 1em;
`

const StyledSelect = styled(Select)`
  width: ${props => (props.block ? "100%" : "15em")};
`

const SelectWithLabel = ({
  label,
  info,
  showType,
  isSecret,
  onChange,
  value,
  options,
  ...otherProps
}) => (
  <Label block={otherProps.block}>
    <StyledSelect
      {...otherProps}
      options={options}
      value={options.find(option => option.value === value)}
      onChange={({ value }) => onChange({ target: { value } })}
    />
    <LabelText
      up
      label={label}
      info={info}
      showType={showType}
      type="select"
      isMulti={otherProps.isMulti}
      isSecret={isSecret}
    />
  </Label>
)

const SelectWithError = ({ error, ...otherProps }) => (
  <>
    <SelectWithLabel {...otherProps} />
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)

export default SelectWithError
