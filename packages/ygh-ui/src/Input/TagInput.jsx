import React, { useCallback, useState } from "react"

import CreatableSelect from "react-select/creatable"
import Select from "../Select"

const components = {
  DropdownIndicator: null
}

const TagInput = ({ value, onChange = () => {}, ...props }) => {
  const [inputValue, setInputValue] = useState("")

  const handleChange = useCallback(
    values => {
      onChange({
        target: {
          value: values.map(({ value }) => value),
          validity: {
            valid: true
          },
          validationMessage: ""
        }
      })
    },
    [onChange]
  )

  const handleKeyDown = useCallback(
    event => {
      if (!inputValue) return

      switch (event.key) {
        case "Enter":
        case "Tab":
          setInputValue("")
          onChange({
            target: {
              validity: {
                valid: true
              },
              validationMessage: "",
              value: Array.isArray(value)
                ? [...value, inputValue]
                : [inputValue]
            }
          })
          event.preventDefault()
      }
    },
    [inputValue, value, onChange]
  )

  return (
    <Select
      selectComponent={CreatableSelect}
      components={components}
      inputValue={inputValue}
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={value => setInputValue(value)}
      onKeyDown={handleKeyDown}
      value={
        Array.isArray(value)
          ? value.map(value => ({ value, label: value }))
          : []
      }
      {...props}
    />
  )
}

export default TagInput
