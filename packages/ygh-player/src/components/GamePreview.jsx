import React from "react"
import styled from "styled-components"

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
`

const StyledPresent = styled(Present)`
  position: absolute;
  left: 50%;
  top: 50%;

  max-width: 80%;
  max-height: 80%;

  transform: translate(-50%, -50%);
`

const GamePreview = props => (
  <ScreenShot {...props}>{!props.src && <StyledPresent />}</ScreenShot>
)

export default GamePreview
