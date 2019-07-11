import React, { useMemo } from "react"
import styled from "styled-components"
import Select from "react-select"

import { useTheme } from "ygh-hooks"

import LabelText from "./Input/LabelText"
import ErrorMessage from "./Input/ErrorMessage"

const Label = styled.label`
  position: relative;

  display: ${props => (props.block ? "block" : "inline-block")};
  max-width: 100%;
`

const createStyles = theme => ({
  control: (base, state) => ({
    ...base,
    minHeight: "43px",
    borderWidth: ".1em",
    boxShadow: "none",
    borderColor: state.isDisabled
      ? "#0001"
      : state.isFocused
      ? theme.color.primary
      : "#0002",
    ":hover": {
      borderColor: state.isFocused ? theme.color.primary : "#0004"
    }
  }),
  dropdownIndicator: base => ({ ...base, cursor: "pointer" }),
  indicatorsContainer: base => ({
    ...base,
    backgroundColor: "#0001",
    borderRadius: "0 .1em .1em 0"
  }),
  indicatorSeparator: () => ({}),
  menu: base => ({
    ...base,
    border: `.1em solid ${theme.color.primary}`,
    boxShadow: "0 .5em 1.5em -.5em #0004"
  })
})

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
}) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <Label block={otherProps.block}>
      <StyledSelect
        {...otherProps}
        options={options}
        styles={styles}
        value={
          otherProps.isMulti
            ? options.filter(option => value.includes(option.value))
            : options.find(option => option.value === value) || null
        }
        onChange={
          otherProps.isMulti
            ? values =>
                onChange({
                  target: {
                    value: values.map(({ value }) => value),
                    options: options.map(({ value }) => ({
                      value,
                      selected: values.some(v => v.value === value)
                    })),
                    validity: {
                      valid: true
                    },
                    validationMessage: ""
                  }
                })
            : next =>
                onChange({
                  target: {
                    value: next ? next.value : null,
                    validity: {
                      valid: true
                    },
                    validationMessage: ""
                  }
                })
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
}

const SelectWithError = ({ error, ...otherProps }) => (
  <>
    <SelectWithLabel {...otherProps} />
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)

export default SelectWithError
