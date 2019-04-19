import styled from "styled-components"
import { darken } from "utils/colors"

import Entity from "./Entity"

const Grass = styled(Entity)`
  background-color: ${props => props.baseColor};

  background-image: linear-gradient(
      85deg,
      transparent 45%,
      #0002 45%,
      #fff2 55%,
      transparent 55%
    ),
    linear-gradient(
      95deg,
      transparent 45%,
      #fff2 45%,
      #0002 55%,
      transparent 55%
    ),
    linear-gradient(
      85deg,
      transparent 45%,
      #fff2 45%,
      #0002 55%,
      transparent 55%
    ),
    linear-gradient(
      95deg,
      transparent 45%,
      #0002 45%,
      #fff2 55%,
      transparent 55%
    ),
    linear-gradient(
      85deg,
      transparent 45%,
      #0002 45%,
      #fff2 55%,
      transparent 55%
    ),
    linear-gradient(
      95deg,
      transparent 45%,
      #fff2 45%,
      #0002 55%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 50% at 50% 50%,
      ${props => darken(-0.1)(props.baseColor)},
      transparent
    ),
    radial-gradient(
      ellipse 50% 50% at 50% 50%,
      ${props => darken(0.1)(props.baseColor)},
      transparent
    );

  background-position: left -0.3em top 0.4em, left 0em top 0em,
    left 0.7em top 0.6em, left 1em top -0.1em, left 1.8em top 0.7em,
    left 2em top 0.1em, center, center;

  background-size: 1.6em 1.6em, 1.6em 1.6em, 1.6em 1.6em, 1.6em 1.6em,
    1.6em 1.6em, 1.6em 1.6em, 23em 23em, 13em 13em;
`
Grass.name = "Grass"
Grass.templateName = "Grass"
Grass.defaultProps = {
  ...Entity.defaultProps,
  baseColor: "#6ab13f",
  z: 0,
  width: 100,
  height: 80
}

export default Grass
