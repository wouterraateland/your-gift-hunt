import styled from "styled-components"
import Entity from "../Entity"

const CameraBody = styled(Entity)`
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
CameraBody.defaultProps = {
  ...Entity.defaultProps,
  z: 0.5,
  width: 3.5,
  height: 1,
  origin: { left: "50%", top: "100%" }
}

export default CameraBody
