import React from "react"
import SelectOptions from "./SelectOptions"

const DisguisedSelectOptions = ({ render: Component, ...props }) => (
  <SelectOptions
    {...props}
    openMenuOnFocus
    isClearable={false}
    styles={{
      control: () => ({}),
      placeholder: () => ({ display: "none" }),
      valueContainer: () => ({ display: "none" }),
      ...props.styles
    }}
    components={{
      DropdownIndicator: ({ innerProps, isDisabled }) => (
        <Component {...innerProps} disabled={isDisabled} />
      ),
      ...props.components
    }}
  />
)

export default DisguisedSelectOptions
