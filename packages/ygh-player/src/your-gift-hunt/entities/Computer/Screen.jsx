import styled from "styled-components"
import Entity from "../Entity"

const Screen = styled(Entity)`
  border-radius: 50% 50% 0 0 / 80% 80% 0 0;

  background: linear-gradient(#ccc, #eee);

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 50% 50% 0 0 / 80% 80% 0 0;

    box-shadow: inset 0 0.2em 0.2em -0.1em #0004;
  }

  &::after {
    left: 0;
    top: 100%;

    width: 4em;
    height: 2em;

    background: radial-gradient(
      ellipse 50% 100% at 50% 0,
      ${props => (props.state === "on" ? "#8ddaeecc" : "transparent")},
      transparent
    );
  }
`
Screen.defaultProps = {
  ...Entity.defaultProps,
  width: 4,
  height: 0.5,
  z: 1
}

export default Screen
