import styled from "styled-components"
import Entity from "../Entity"

const Worktop = styled(Entity)`
  border-radius: 0.4em 0.4em 0 0;

  &::before {
    width: 100%;
    height: 100%;
    border-radius: 0.4em 0.4em 0 0;
    box-shadow: inset 0 0.2em 0.4em -0.1em #fff4;
  }

  &::after {
    left: 0.5em;
    top: 0.5em;
    right: 0.5em;
    bottom: 0;

    border-radius: 0.2em 0.2em 0 0;
    box-shadow: 0 -0.2em 0.4em -0.1em #0004, inset 0 0.2em 0.4em -0.1em #0004;
  }

  background-color: #999;

  background-image: repeating-linear-gradient(
      30deg,
      #0001,
      #fff1 0.4em,
      #0001 0.8em
    ),
    repeating-linear-gradient(-30deg, #0001, #fff1 0.4em, #0001 0.8em);
`
Worktop.defaultProps = {
  ...Entity.defaultProps,
  width: 15,
  height: 6,
  z: 2
}

export default Worktop
