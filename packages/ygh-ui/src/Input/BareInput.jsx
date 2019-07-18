import React, { forwardRef, useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"
import { useForceUpdate } from "ygh-hooks"

export const Input = styled.input`
  display: inline-block;
  max-width: 100%;
  height: 1.5em;
  min-height: 1.5em;
  padding: 0;
  margin: 0;
  border: none;

  line-height: 1.5;

  resize: none;

  background: transparent;
  color: ${props =>
    props.disabled ? props.theme.color.caption : props.theme.color.text};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.color.caption};
  }

  &:disabled,
  &:disabled::placeholder {
    color: #d4d4d4;
  }

  ${_.blockStyles}

  ${props =>
    props.type === "search" &&
    css`
      line-height: 1.5;
      -webkit-appearance: textfield;
      &::-webkit-search-decoration {
        -webkit-appearance: none;
      }
    `}
`
Input.displayName = "Input"

const setDimensions = (el, resizeH) => {
  if (el) {
    if (el.nodeName === "TEXTAREA") {
      el.style.height = "0"
      const offset = el.offsetHeight
      el.style.height = `${Math.max(offset, el.scrollHeight)}px`
    } else if (resizeH) {
      el.style.width = "0"
      const offset = el.offsetWidth
      el.style.width = `${Math.max(offset, el.scrollWidth)}px`
    }
  }
}

const BareInput = forwardRef(
  ({ value, onChange, resizeH, ...otherProps }, ref) => {
    const myRef = useRef(null)
    const forceUpdate = useForceUpdate()
    useEffect(() => setDimensions(myRef.current, resizeH), [
      otherProps.type,
      value,
      resizeH
    ])

    return (
      <Input
        as={otherProps.type === "textarea" ? "textarea" : "input"}
        ref={el => {
          if (ref) ref.current = el
          if (el) {
            el.addEventListener("input", () => setDimensions(el, resizeH))
          } else {
            myRef.current.removeEventListener("input", () =>
              setDimensions(el, resizeH)
            )
          }
          myRef.current = el
        }}
        value={value === undefined ? undefined : value === null ? "" : value}
        onChange={_.maybe(onChange, _.constant(undefined), event => {
          forceUpdate()
          if (onChange) {
            switch (otherProps.type) {
              case "number":
                return onChange({
                  ...event,
                  target: {
                    ...event.target,
                    value: parseFloat(event.target.value)
                  }
                })
              default:
                return onChange(event)
            }
          }
        })}
        {...otherProps}
      />
    )
  }
)

export default BareInput
