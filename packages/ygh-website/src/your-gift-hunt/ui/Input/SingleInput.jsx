import React, { forwardRef, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"
import _ from "utils"

import { LabelText } from "./LabelText"

export const Input = styled.input`
  display: inlinline-block;
  width: 15em;
  max-width: 100%;
  height: 1.5em;
  min-height: 1.5em;
  padding: 0;
  margin: 0;
  border: none;

  resize: none;

  background: transparent;
  color: ${props =>
    props.disabled
      ? transparentize(0.2, props.theme.color.text)
      : props.theme.color.text};

  &:focus,
  &:active {
    outline: none;

    ${props =>
      !props.isSelect &&
      css`
        & + ${LabelText} {
          left: 0;
          top: -1.7em;
          font-size: 0.7em;
        }
      `}
  }

  ${props =>
    props.isSelect
      ? css`
          width: 1em;
        `
      : _.blockStyles(props)}
`

Input.displayName = "Input"

const setHeight = el => {
  if (el.nodeName === "TEXTAREA") {
    el.style.height = "0"
    const offset = el.offsetHeight
    el.style.height = `${Math.max(offset, el.scrollHeight)}px`
  }
}

const SingleInput = forwardRef(({ value, onChange, ...otherProps }, ref) => {
  const myRef = useRef(null)

  useEffect(
    () => {
      myRef && myRef.current && setHeight(myRef.current)
    },
    [value]
  )

  return (
    <Input
      as={otherProps.type === "textarea" ? "textarea" : "input"}
      ref={otherProps.type === "textarea" ? myRef : ref}
      value={value === undefined ? undefined : value === null ? "" : value}
      onChange={
        onChange === undefined
          ? undefined
          : otherProps.type === "number"
          ? event =>
              onChange({
                ...event,
                target: {
                  ...event.target,
                  value: parseInt(event.target.value, 10)
                }
              })
          : onChange
      }
      {...otherProps}
    />
  )
})

export default SingleInput
