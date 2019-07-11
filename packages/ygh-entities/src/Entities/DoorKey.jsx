import styled from "styled-components"

import Entity from "../Entity"

const DoorKey = styled(Entity)`
  border-radius: 100%;
  width: 0.5em;
  height: 0.5em;
  margin: 0.75em;

  box-shadow: 0 0 0 0.1em #7e6d63, 0.35em -0.35em 0 0.9em,
    0.35em -0.35em 0 1em #7e6d63 !important;

  color: #9a8d7d;

  transform: translate(-0.6em, 0.55em) scale(0.46);

  &::before {
    width: 0.5em;
    height: 0.5em;

    box-shadow: 1.5em -1.7em 0 0.1em, 2.1em -2.2em 0 0em, 2.6em -2.8em 0 0em,
      3.2em -2.98em 0 0em;
  }

  &::after {
    left: 1.05em;
    top: -2.05em;

    width: 2.8em;
    height: 0.7em;

    border-bottom: 0.1em solid #7e6d63;

    background-color: currentColor;
    background-image: linear-gradient(90deg, #9a8d7d, transparent 30%),
      linear-gradient(
        transparent 34%,
        #0004 34%,
        #0004 49%,
        transparent 49%,
        transparent 68%,
        #0004 68%,
        #0004 83%,
        transparent 83%
      );

    transform: rotate(-45deg);
  }
`
DoorKey.name = "DoorKey"
DoorKey.displayName = "DoorKey"
DoorKey.templateName = "Door key"
DoorKey.defaultProps = {
  ...Entity.defaultProps,
  width: 2,
  height: 2
}
DoorKey.states = []
DoorKey.Detail = DoorKey

export default DoorKey
