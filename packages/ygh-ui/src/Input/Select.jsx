import React, { useCallback, useMemo } from "react"
import Select from "react-select"

import { useTheme } from "ygh-hooks"

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
  indicatorsContainer: (base, state) => ({
    ...base,
    backgroundColor: "#0001",
    borderRadius: "0 .1em .1em 0",
    borderLeft: "2px solid #0002",
    borderColor: state.isFocused
      ? theme.color.primary
      : state.isHovered
      ? "#0004"
      : "#0002",
    backgroundClip: "padding-box"
  }),
  indicatorSeparator: () => ({}),
  menu: base => ({
    ...base,
    border: `2px solid ${theme.color.primary}`,
    boxShadow: theme.boxShadow.medium
  })
})

const EnhancedSelect = ({ onChange, value, options, ...otherProps }) => {
  const theme = useTheme()
  const styles = useMemo(() => createStyles(theme), [theme])

  const actualValue = useMemo(
    () =>
      otherProps.isMulti
        ? options.filter(option => value.includes(option.value))
        : options.find(option => option.value === value) || null,
    [otherProps.isMulti, options, value]
  )

  const handleChange = useCallback(
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
          }),
    [onChange, options]
  )

  return (
    <Select
      {...otherProps}
      options={options}
      styles={styles}
      value={actualValue}
      onChange={handleChange}
    />
  )
}

export default EnhancedSelect
