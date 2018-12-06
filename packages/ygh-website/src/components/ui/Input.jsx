import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

const Label = styled.label`
  position: relative;

  display: inline-block;
  padding: .5em .7em;
  border: .1em solid ${props => transparentize(.5, props.theme.color.text)};

  line-height: 1;
  vertical-align: middle;

  ${props => props.block && css`
    width: 100%;
    display: block;
  `}
`

Label.displayName = 'Label'

const LabelText = styled.span`
  position: absolute;

  color: ${props => transparentize(.2, props.theme.color.text)};

  transition:
    left .2s ease-out,
    top .2s ease-out,
    font-size .2s ease-out;

  ${props => props.up
    ? css`
        left: 0; top: -1.7em;
        font-size: .7em;
      `
    : css`
        left: .7rem;
        top: .7em;
      `
  }
`

LabelText.displayName = 'LabelText'

const MemoizedLabelText = memo(LabelText)

const Input = styled.input`
  height: 1.5em;
  padding: 0;
  border: none;

  background: transparent;

  &:focus, &:active {
    outline: none;

    & + ${LabelText} {
      left: 0; top: -1.7em;
      font-size: .7em;
    }
  }

  ${props => props.block && css`
    width: 100%;
    display: block;
  `}
`

Input.displayName = 'Input'

export default ({ label, ...rest }) => (
  <>
    <Label block={rest.block}>
      <Input {...rest}/>
      <MemoizedLabelText up={rest.value !== ''}>{label}</MemoizedLabelText>
    </Label>
  </>
)
