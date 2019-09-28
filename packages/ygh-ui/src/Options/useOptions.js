import { useCallback } from "react"

const useOptions = ({ name, isMulti, options, onChange, value, disabled }) => {
  const isChecked = useCallback(
    optionValue =>
      isMulti
        ? Array.isArray(value) && value.includes(optionValue)
        : value === optionValue,
    [isMulti, value]
  )

  const handleChange = optionValue => event => {
    const newValue = isMulti
      ? Array.isArray(value) && value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...(value || []), optionValue]
      : optionValue === value
      ? null
      : optionValue

    return onChange({
      ...event,
      target: {
        ...event.target,
        validity: { valid: true },
        validationMessage: "",
        value: newValue,
        options: options.map(option => ({
          value: option.value,
          selected: isMulti
            ? newValue.includes(option.value)
            : newValue === option.value
        }))
      }
    })
  }

  const optionProps = option => ({
    name,
    value: option.value,
    checked:
      typeof onChange === "function" ? isChecked(option.value) : undefined,
    onChange:
      typeof onChange === "function" ? handleChange(option.value) : undefined,
    disabled: disabled || option.disabled
  })

  return optionProps
}

export default useOptions
