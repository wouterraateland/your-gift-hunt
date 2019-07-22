import React, { forwardRef } from "react"
import styled from "styled-components"

import DefaultInput from "./DefaultInput"

const ColorIndicator = styled.div`
  position: relative;

  width: 1em;
  height: 1em;
  border: 1px solid #0002;
  border-radius: 100%;

  background: linear-gradient(#000 50%, #fff 50%) no-repeat left padding-box /
      50% 100%,
    linear-gradient(#fff 50%, #000 50%) no-repeat right padding-box / 50% 100%;
  background-clip: padding-box;

  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: 100%;

    background-color: ${props => props.color};
  }
`

const ColorInput = forwardRef((props, ref) => (
  <DefaultInput
    ref={ref}
    {...props}
    type="text"
    prefix="#"
    trail={<ColorIndicator color={`#${props.value}`} />}
  />
))

export default ColorInput
