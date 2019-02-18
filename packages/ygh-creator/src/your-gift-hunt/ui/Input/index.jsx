import React from "react"

import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import ErrorMessage from "./ErrorMessage"
import InputType from "./InputType"

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
  <Label block={otherProps.block} isSelect={isSelect}>
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
    >
      {label}
      {info && <small>{info}</small>}
      {showType && (
        <InputType
          type={otherProps.type}
          isMulti={isMulti}
          isSecret={isSecret}
        />
      )}
    </LabelText>
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
