import React from "react"
import styled from "styled-components"

import ObjectPart from "./ObjectPart"

const Lens = styled(ObjectPart)`
  left: 0;
  top: 0;
  right: 0;

  width: 1.5em;
  height: 1.25em;
  margin: auto;
  border-radius: 0.125em 0.125em 0.25em 0.25em / 0.125em 0.125em 1em 1em;

  transform-origin: center bottom;

  background-color: #263238;
  background-image: radial-gradient(
      ellipse 10% 80% at 30% 10%,
      rgba(255, 255, 255, 0.8),
      transparent
    ),
    radial-gradient(
      ellipse 40% 100% at 40% 0,
      rgba(255, 255, 255, 0.5),
      transparent
    );
`
Lens.displayName = "Camera.Lens"

const Body = styled(ObjectPart)`
  left: 0;
  right: 0;
  bottom: 0;

  height: 1em;

  border-radius: 0.375em;

  background-color: #263238;
  background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 50%
    ),
    linear-gradient(45deg, rgba(255, 255, 255, 0.2) 50%, transparent 50%);
  background-size: 20% 100%, 20% 100%;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 0.375em;

    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4,
      inset 0 -0.2em 0.4em -0.1em #0004;
  }

  &::after {
    right: 0.35em;
    bottom: 0.35em;

    width: 0.6em;
    height: 0.3em;
    border-radius: 0.125em;

    box-shadow: inset 0 0.1em 0.2em #fff4, inset 0 -0.1em 0.2em #0004;

    background-color: #f44336;
    background-image: radial-gradient(
      ellipse 30% 20% at 40% 40%,
      #fff,
      transparent
    );
  }
`
Body.displayName = "Camera.Body"

const Camera = () => (
  <>
    <Lens z={0.4} />
    <Body z={0.5} />
  </>
)
Camera.entityName = "Camera"
Camera.width = 3.5
Camera.height = 2.25

export default Camera
