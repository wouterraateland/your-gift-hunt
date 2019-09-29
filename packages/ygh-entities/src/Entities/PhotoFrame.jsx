import React, { forwardRef } from "react"
import styled from "styled-components"
import _ from "ygh-utils"

import Entity from "../Entity"
import PhotoFrameDetail from "../EntityDetails/PhotoFrame"

const Stand = styled(Entity)`
  border-top: ${props => props.height}em solid #000;
  border-left: 0.125em solid transparent;
  border-right: 0.125em solid transparent;
  background-color: #000;
  background-clip: padding-box;
`
Stand.defaultProps = {
  ...Entity.defaultProps,
  width: 0.5
}

const Frame = styled(Entity)`
  border: solid currentColor;
  border-width: 0.25em 0.1em 0.1em;

  &::before {
    top: 50%;
    left: 50%;

    width: 100%;
    height: 400%;

    background: #ddd url(${props => props.src}) no-repeat center / cover;

    transform: translate(-50%, -50%) scale(1, 0.25);
  }

  &::after {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: linear-gradient(
      -45deg,
      transparent,
      transparent,
      transparent,
      #fff,
      transparent,
      transparent,
      #fff,
      transparent,
      transparent
    );
  }
`
Frame.defaultProps = {
  ...Entity.defaultProps,
  height: 0.5
}

const PhotoFrame = forwardRef(({ inspect, children, ...props }, ref) => (
  <Entity noVisual {...props} onClick={inspect} ref={ref}>
    <Stand height={props.height * 0.25} top={props.height * 0.125} />
    <Frame
      width={props.width}
      height={props.height * 0.75}
      top={props.height * (0.25 + 0.75 / 2)}
      src={_.getFieldValue("Image")(props)}
    />
    {children}
  </Entity>
))
PhotoFrame.name = "PhotoFrame"
PhotoFrame.templateName = "Photo Frame"
PhotoFrame.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 1,
  color: "#242221"
}
PhotoFrame.Detail = PhotoFrameDetail

export default PhotoFrame
