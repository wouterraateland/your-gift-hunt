import React from "react"
import styled, { css } from "styled-components"

import { Present } from "your-gift-hunt/components"

const ScreenShot = styled.div`
  position: relative;
  overflow: hidden;

  display: block;
  padding-top: 75%;

  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow.medium};

  background: ${props => props.theme.color.primary} url(${props => props.src})
    no-repeat center / cover;

  ${props =>
    props.progress !== null &&
    props.progress !== undefined &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;

        height: 4em;
        background: linear-gradient(transparent, #0009 80%);
      }
    `}
`

const StyledPresent = styled(Present)`
  position: absolute;
  left: 50%;
  top: 50%;

  max-width: 80%;
  max-height: 80%;

  transform: translate(-50%, -50%);
`

const ProgressBar = styled.div`
  position: absolute;
  left: 1em;
  bottom: 0.5em;
  right: 1em;
  z-index: 1;

  color: #fff;
`

const GamePreview = props => (
  <ScreenShot {...props}>
    {!props.src && <StyledPresent />}
    {props.progress !== null && props.progress !== undefined && (
      <ProgressBar>{(props.progress * 100).toFixed(0)}% Completed</ProgressBar>
    )}
  </ScreenShot>
)

export default GamePreview
