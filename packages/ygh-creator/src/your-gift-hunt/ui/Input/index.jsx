import React from "react"

import Container from "./Container"
import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import GeopointInput from "./GeopointInput"
import ErrorMessage from "./ErrorMessage"

const Input = ({
  icon,
  label,
  info,
  isMulti,
  isSecret,
  isSelect,
  showType,
  style,
  ...otherProps
}) => (
  <Label
    style={style}
    block={otherProps.block}
    isSelect={isSelect}
    isMap={otherProps.type === "geopoint"}
    disabled={otherProps.disabled}
  >
    {(icon || otherProps.type === "search") && (
      <BeforeLabel type={icon || otherProps.type} />
    )}
    {otherProps.type === "geopoint" ? (
      <GeopointInput {...otherProps} />
    ) : isMulti ? (
      <MultiInput {...otherProps} />
    ) : (
      <SingleInput {...otherProps} isSelect={isSelect} />
    )}
    <LabelText
      isSelect={isSelect}
      up={true}
      //   otherProps.value !== undefined &&
      //   otherProps.value !== null &&
      //   (isMulti ? otherProps.value.length > 0 : otherProps.value !== "")
      // }
      label={label}
      info={info}
      showType={showType}
      type={otherProps.type}
      isMulti={isMulti}
      isSecret={isSecret}
    />
  </Label>
)

export default ({ error, className, ...otherProps }) => (
  <Container className={className} block={otherProps.block}>
    <Input
      {...otherProps}
      isSelect={["radio", "checkbox"].includes(otherProps.type)}
    />
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </Container>
)
