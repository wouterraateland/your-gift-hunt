import React, { useCallback, useMemo } from "react"
import Select from "../Select"

const SelectInput = ({ onChange, value, options, ...otherProps }) => {
  const actualValue = useMemo(
    () =>
      otherProps.isMulti
        ? options.filter(
            option => Array.isArray(value) && value.includes(option.value)
          )
        : options.find(option => option.value === value) || null,
    [otherProps.isMulti, options, value]
  )

  const handleChange = useCallback(
    otherProps.isMulti
      ? values =>
          onChange({
            target: {
              value: Array.isArray(values)
                ? values.map(({ value }) => value)
                : [],
              options: options.map(({ value }) => ({
                value,
                selected: Array.isArray(values)
                  ? values.some(v => v.value === value)
                  : false
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
    [otherProps.isMulti, onChange, options]
  )

  return (
    <Select
      {...otherProps}
      options={options}
      value={actualValue}
      onChange={handleChange}
      isDisabled={otherProps.disabled}
    />
  )
}

export default SelectInput
