import styled from "styled-components"

import Entity from "./Entity"

const Seeds = styled(Entity)`
  border-radius: 100% 100% 20% 100%;

  box-shadow: inset 0 0 0.5em #000;

  background-image: radial-gradient(
      ellipse 40% 40% at 50% 50%,
      transparent,
      #362d2b
    ),
    linear-gradient(
      45deg,
      transparent 30%,
      #fff 32%,
      #fff 34%,
      transparent 36%,
      transparent 47%,
      #fff 49%,
      #fff 51%,
      transparent 53%,
      transparent 64%,
      #fff 66%,
      #fff 68%,
      transparent 70%
    );
  background-color: #362d2b;

  transform: skew(15deg, 15deg) scale(0.85) translate(-0.1em, -0.1em);
`
Seeds.name = "Seeds"
Seeds.templateName = "Seeds"
Seeds.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 2
}

export default Seeds
