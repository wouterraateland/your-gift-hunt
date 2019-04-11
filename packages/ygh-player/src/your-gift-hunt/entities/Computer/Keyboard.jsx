import styled from "styled-components"
import Entity from "../Entity"

const Keyboard = styled(Entity)`
  border-radius: 0.1em;

  background: linear-gradient(#ccc, #eee 10%);

  &::before,
  &::after {
    right: 100%;
    bottom: 100%;

    width: 0.2em;
    border-radius: 0.05em;

    color: #444;
  }

  &::before {
    height: 0.15em;

    box-shadow: 0.25em 0.2em, 0.5em 0.2em, 0.75em 0.2em, 1em 0.2em, 1.25em 0.2em,
      1.5em 0.2em, 1.75em 0.2em, 2em 0.2em, 2.25em 0.2em;
  }

  &::after {
    height: 0.2em;

    box-shadow: 0.25em 0.95em, 0.25em 0.7em, 0.25em 0.45em, 0.5em 0.95em,
      0.6em 0.7em, 0.5em 0.45em, 0.75em 0.95em, 0.85em 0.7em, 0.75em 0.45em,
      1em 0.95em, 1.1em 0.7em, 1em 0.45em, 1.25em 0.95em, 1.35em 0.7em,
      1.25em 0.45em, 1.5em 0.95em, 1.6em 0.7em, 1.5em 0.45em, 1.75em 0.95em,
      1.85em 0.7em, 1.75em 0.45em, 2em 0.95em, 2.1em 0.7em, 2em 0.45em,
      2.25em 0.95em, 2.25em 0.7em, 2.25em 0.45em, 0.35em 0.7em;
  }
`
Keyboard.defaultProps = {
  ...Entity.defaultProps,
  width: 2.3,
  height: 1
}

export default Keyboard
