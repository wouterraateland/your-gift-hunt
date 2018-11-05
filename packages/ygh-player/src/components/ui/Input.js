import React, { memo } from 'react'
import styled, { css } from 'styled-components'

const Label = styled.label`
  position: relative;

  padding: 1.5em 1em .5em;
  border: .2em solid;
  border-radius: .5em;

  ${props => props.block && css`
    width: 100%;
    display: block;
  `}
`

Label.displayName = 'Label'

const LabelText = styled.span`
  position: absolute;
  left: 1rem;

  color: rgba(0, 0, 0, .5);

  transition:
    top .2s ease-out,
    font-size .2s ease-out;

  ${props => props.up
    ? css`
        top: .5rem;
        font-size: .7em;
      `
    : css`
        top: 1rem;
      `
  }
`

LabelText.displayName = 'LabelText'

const MemoizedLabelText = memo(LabelText)

const Input = styled.input`
  height: 1em;
  padding: 0;
  border: none;

  background: transparent;

  &:focus, &:active {
    outline: none;

    & + ${LabelText} {
      top: .5rem;
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
