import React, { forwardRef, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

import { LabelText } from "./LabelText"

const Input = styled.input`
  width: 15em;
  max-width: 100%;
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
    props.block &&
    css`
      width: 100%;
      display: block;
    `}
`

Input.displayName = "Input"
Input.defaultProps = {
  value: ""
}

const setHeight = el => {
  if (el.nodeName === "TEXTAREA") {
    el.style.height = "0"
    const offset = el.offsetHeight
    el.style.height = `${Math.max(offset, el.scrollHeight)}px`
  }
}

export default forwardRef(({ value, ...otherProps }, ref) => {
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
      value={value === null ? "" : value}
      {...otherProps}
    />
  )
})
