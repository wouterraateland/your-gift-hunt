import React from "react"
import styled, { css } from "styled-components"
import _ from "ygh-utils"

const Container = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  white-space: nowrap;

  display: inline-block;
  max-width: 100%;
  border: 2px solid #0002;
  border-radius: ${props => props.theme.borderRadius};

  background-color: #fff;
  background-clip: padding-box;
`

const Option = styled.label`
  cursor: pointer;

  display: inline-block;
  padding: 0.5em;

  line-height: 1;

  &:not(:first-of-type) {
    border-left: 2px solid #0002;
  }

  & input {
    position: absolute;
    opacity: 0;
  }

  & * {
    vertical-align: bottom;
  }

  background-clip: padding-box;

  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
          background-color: #0002;
          ${props.isChecked &&
            css`
              background-color: #0004;
            `}
        `
      : props.isChecked
      ? css`
          background-color: ${props => props.theme.color.primary};
          color: #fff;

          &:hover {
            background-color: ${props =>
              _.darken(0.05)(props.theme.color.primary)};
          }
        `
      : css`
          &:hover {
            background-color: #0001;
          }
        `}
`

const HorizontalSelect = ({
  isMulti,
  onChange,
  value,
  options,
  ...otherProps
}) => (
  <Container {...otherProps}>
    {options.map(({ label, ...rest }) => (
      <Option
        key={rest.value}
        disabled={rest.disabled || otherProps.disabled}
        isChecked={isMulti ? value.includes(rest.value) : value === rest.value}
      >
        <input
          type="checkbox"
          disabled={otherProps.disabled}
          checked={isMulti ? value.includes(rest.value) : value === rest.value}
          onChange={event => {
            if (isMulti) {
              onChange({
                target: {
                  options: options.map(option => ({
                    value: option.value,
                    selected:
                      option.value === event.target.value
                        ? event.target.checked
                        : value.includes(option.value)
                  })),
                  validity: {
                    valid: true
                  },
                  validationMessage: ""
                }
              })
            } else {
              onChange({
                target: {
                  value: rest.value,
                  validity: {
                    valid: true
                  },
                  validationMessage: ""
                }
              })
            }
          }}
          {...rest}
        />
        {label}
      </Option>
    ))}
  </Container>
)

export default HorizontalSelect
