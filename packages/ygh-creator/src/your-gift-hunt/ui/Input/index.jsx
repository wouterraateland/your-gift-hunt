import React from "react"

import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import ErrorMessage from "./ErrorMessage"

export default ({ icon, label, error, isMulti, ...rest }) => (
  <>
    <Label block={rest.block}>
      {(icon || rest.type === "search") && (
        <BeforeLabel type={icon || rest.type} />
      )}
      {isMulti ? <MultiInput {...rest} /> : <SingleInput {...rest} />}
      <LabelText up={isMulti ? rest.value.length > 0 : rest.value !== ""}>
        {label}
      </LabelText>
    </Label>
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)
