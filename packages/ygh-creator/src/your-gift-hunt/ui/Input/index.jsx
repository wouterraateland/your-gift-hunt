import React, { forwardRef } from "react"

import HorizontalSelect from "../HorizontalSelect"
import Select from "../Select"

import Container from "./Container"
import Label from "./Label"
import LabelText from "./LabelText"
import BeforeLabel from "./BeforeLabel"
import SingleInput from "./SingleInput"
import MultiInput from "./MultiInput"
import GeopointInput from "./GeopointInput"
import ErrorMessage from "./ErrorMessage"

const Input = forwardRef(
  (
    {
      icon,
      label,
      info,
      isMulti,
      isSecret,
      isSelect,
      showType,
      style,
      ...otherProps
    },
    ref
  ) => (
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
        <SingleInput ref={ref} {...otherProps} isSelect={isSelect} />
      )}
      <LabelText
        isSelect={isSelect}
        up={true}
        label={label}
        info={info}
        showType={showType}
        type={otherProps.type}
        isMulti={isMulti}
        isSecret={isSecret}
      />
    </Label>
  )
)

const InputWithError = forwardRef(
  ({ error, className, ...otherProps }, ref) => (
    <Container className={className} block={otherProps.block}>
      <Input
        ref={ref}
        {...otherProps}
        isSelect={["radio", "checkbox"].includes(otherProps.type)}
      />
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
)

export default forwardRef((props, ref) =>
  props.type === "select" ? (
    props.format === "horizontal" ? (
      <HorizontalSelect {...props} />
    ) : (
      <Select {...props} />
    )
  ) : (
    <InputWithError {...props} ref={ref} />
  )
)
