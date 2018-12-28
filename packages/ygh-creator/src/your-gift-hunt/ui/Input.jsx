import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { transparentize, opacify, invert } from 'polished'

const Label = styled.label`
  position: relative;

  display: ${props => props.block ? 'block' : 'inline-block'};
  max-width: 100%;
  padding: .5em .7em;
  border: .1em solid ${props => transparentize(.5, props.theme.color.text)};

  line-height: 1;
  vertical-align: middle;

  background-color: ${props => opacify(1, invert(props.theme.color.text))};

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
  width: 15em;
  max-width: 100%;
  height: 1.5em;
  padding: 0;
  border: none;

  background: transparent;
  color: ${props => props.theme.color.text};

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

const ErrorMessage = styled.small`
  color: ${props => props.theme.color.error};
`

export default ({ label, error, ...rest }) => (
  <>
    <Label block={rest.block}>
      <Input {...rest}/>
      <MemoizedLabelText up={rest.value !== ''}>{label}</MemoizedLabelText>
    </Label>
    {!!error && <ErrorMessage>{error}</ErrorMessage>}
  </>
)
