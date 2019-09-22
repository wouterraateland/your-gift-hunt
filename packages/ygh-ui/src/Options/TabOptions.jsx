import React from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

import useOptions from "./useOptions"

const Container = styled.div`
  white-space: nowrap;

  display: inline-block;
  max-width: 100%;
  padding: ${props => props.theme.borderWidth};
  border-radius: ${props => props.theme.borderRadius};

  background-color: #0002;
`

const Option = styled.label`
  display: inline-block;
  padding: calc(0.75em - 1px);

  line-height: 1;

  &:not(:first-of-type) {
    margin-left: ${props => props.theme.borderWidth};
  }

  &:first-of-type {
    border-radius: 3px 0 0 3px;
  }

  &:last-of-type {
    border-radius: 0 3px 3px 0;
  }

  & input {
    pointer-events: none;
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
          background-color: ${props.checked ? "#d4d4d4" : "#f9f9f9"};
          color: ${props.checked ? "#f9f9f9" : "#d4d4d4"};
        `
      : css`
          cursor: pointer;

          background: #fff;

          ${props.checked &&
            css`
              background-color: ${props.theme.color.primary};
              color: #fff;
            `}

          &:hover {
            position: relative;
            box-shadow: 0 0 0 2px #0004;
          }
          &:focus-within {
            position: relative;
            box-shadow: 0 0 0 2px ${props.theme.color.primary},
              0 0 0 6px ${transparentize(0.5)(props.theme.color.primary)};
          }
        `}
`

const TabInput = props => {
  const getOptionProps = useOptions(props)

  return (
    <Container disabled={props.disabled}>
      {props.options.map(option => {
        const optionProps = getOptionProps(option)

        return (
          <Option key={option.value} {...optionProps}>
            <input
              type={props.isMulti ? "checkbox" : "radio"}
              {...optionProps}
            />
            {option.label}
          </Option>
        )
      })}
    </Container>
  )
}

export default TabInput
