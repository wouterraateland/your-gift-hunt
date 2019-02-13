import React from "react"

import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import ErrorMessage from "./ErrorMessage"
import InputType from "./InputType"

export default ({
  icon,
  label,
  error,
  isMulti,
  isSecret,
  showType,
  ...otherProps
}) => (
  <>
    <Label block={otherProps.block}>
      {(icon || otherProps.type === "search") && (
        <BeforeLabel type={icon || otherProps.type} />
      )}
      {isMulti ? (
        <MultiInput {...otherProps} />
      ) : (
        <SingleInput {...otherProps} />
      )}
      <LabelText
        up={
          otherProps.value !== undefined &&
          otherProps.value !== null &&
          (isMulti ? otherProps.value.length > 0 : otherProps.value !== "")
        }
      >
        {label}
        {showType && (
          <InputType
            type={otherProps.type}
            isMulti={isMulti}
            isSecret={isSecret}
          />
        )}
      </LabelText>
    </Label>
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)
