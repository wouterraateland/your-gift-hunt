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
      valueContainer: () => ({ display: "none" })
    }}
    components={{
      DropdownIndicator: ({ innerProps }) => (
        <Component {...innerProps} disabled={props.isDisabled} />
      )
    }}
  />
)

export default DisguisedSelectOptions
