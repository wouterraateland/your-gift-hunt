import styled from "styled-components"
import Entity from "../../Entity"

const CameraLens = styled(Entity)`
  height: calc(100% - 1em);
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
CameraLens.defaultProps = {
  ...Entity.defaultProps,
  z: 0,
  width: 1.5,
  height: "100%",
  origin: { left: "50%", top: "0%" }
}

export default CameraLens
