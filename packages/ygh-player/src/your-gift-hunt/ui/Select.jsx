import React from "react"
import styled from "styled-components"
import Select from "react-select"

import LabelText from "./Input/LabelText"
import ErrorMessage from "./Input/ErrorMessage"

const Label = styled.label`
  position: relative;

  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;
`

const SELECT_STYLES = {
  control: base => ({ ...base, borderWidth: ".1em", boxShadow: "none" }),
  dropdownIndicator: base => ({ ...base, cursor: "pointer" }),
  group: base => ({ ...base, backgroundColor: "#f39" }),
  indicatorsContainer: base => ({ ...base, backgroundColor: "#0001" }),
  indicatorSeparator: () => ({}),
  menu: base => ({
    ...base,
    border: ".1em solid #3f51b5",
    boxShadow: "0 .5em 1.5em -.5em #0004"
  })
}

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
      styles={SELECT_STYLES}
      value={
        otherProps.isMulti
          ? options.filter(option => value.includes(option.value))
          : options.find(option => option.value === value)
      }
      onChange={
        otherProps.isMulti
          ? values =>
              onChange({ target: { value: values.map(({ value }) => value) } })
          : next => onChange({ target: { value: next ? next.value : null } })
      }
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
