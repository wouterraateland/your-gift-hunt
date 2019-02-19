import React from "react"

import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import ErrorMessage from "./ErrorMessage"

const Input = ({
  icon,
  label,
  info,
  isMulti,
  isSecret,
  isSelect,
  showType,
  ...otherProps
}) => (
  <Label
    block={otherProps.block}
    isSelect={isSelect}
    disabled={otherProps.disabled}
  >
    {(icon || otherProps.type === "search") && (
      <BeforeLabel type={icon || otherProps.type} />
    )}
    {isMulti ? (
      <MultiInput {...otherProps} />
    ) : (
      <SingleInput {...otherProps} isSelect={isSelect} />
    )}
    <LabelText
      isSelect={isSelect}
      up={
        otherProps.value !== undefined &&
        otherProps.value !== null &&
        (isMulti ? otherProps.value.length > 0 : otherProps.value !== "")
      }
      label={label}
      info={info}
      showType={showType}
      type={otherProps.type}
      isMulti={isMulti}
      isSecret={isSecret}
    />
  </Label>
)

export default ({ error, ...otherProps }) => (
  <>
    <Input
      {...otherProps}
      isSelect={["radio", "checkbox"].includes(otherProps.type)}
    />
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)
