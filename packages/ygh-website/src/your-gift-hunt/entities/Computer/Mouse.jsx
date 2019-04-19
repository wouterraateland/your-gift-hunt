import styled from "styled-components"
import Entity from "../Entity"

const Mouse = styled(Entity)`
  border-radius: 0.375em;

  background: #eee;

  &::before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    border-radius: 0.375em;

    box-shadow: inset 0 -0.1em 0.2em #0004;
  }

  &::after {
    left: 0.3em;
    top: 0.25em;

    width: 0.15em;
    height: 0.2em;
    border-radius: 0.5em;

    box-shadow: inset 0 0 0.1em #000;

    background: #444;
  }
`
Mouse.defaultProps = {
  ...Entity.defaultProps,
  width: 0.75,
  height: 1,
  z: 0.25
}

export default Mouse
