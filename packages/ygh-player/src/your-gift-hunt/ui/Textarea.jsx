import React, { memo } from "react"
import styled, { css } from "styled-components"
import { transparentize } from "polished"

const Label = styled.label`
  position: relative;

  display: inline-block;
  padding: 0.5em 0.7em;
  border: 0.1em solid ${props => transparentize(0.5, props.theme.color.text)};

  line-height: 1;
  vertical-align: middle;

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}
`

Label.displayName = "Label"

const LabelText = styled.span`
  position: absolute;

  color: ${props => transparentize(0.2, props.theme.color.text)};

  transition: left 0.2s ease-out, top 0.2s ease-out, font-size 0.2s ease-out;

  ${props =>
    props.up
      ? css`
          left: 0;
          top: -1.7em;
          font-size: 0.7em;
        `
      : css`
          left: 0.7rem;
          top: 0.7em;
        `}
`

LabelText.displayName = "LabelText"

const MemoizedLabelText = memo(LabelText)

const Textarea = styled.textarea`
  height: 8em;
  padding: 0;
  border: none;
  resize: vertical;

  background: transparent;

  &:focus,
  &:active {
    outline: none;

    & + ${LabelText} {
      left: 0;
      top: -1.7em;
      font-size: 0.7em;
    }
  }

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `}
`

Textarea.displayName = "Textarea"

export default ({ label, ...rest }) => (
  <>
    <Label block={rest.block}>
      <Textarea {...rest} />
      <MemoizedLabelText up={rest.value !== ""}>{label}</MemoizedLabelText>
    </Label>
  </>
)
