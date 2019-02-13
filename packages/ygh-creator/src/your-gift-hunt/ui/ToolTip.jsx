import styled from "styled-components"

const ToolTip = styled.div`
  pointer-events: none;

  position: absolute;
  left: 50%;
  bottom: 100%;

  padding: 0.5em;
  border-radius: 0.25em;

  white-space: nowrap;
  text-align: left;
  line-height: 1.5;
  font-size: 0.8rem;

  background: #000c;
  color: #fff;

  & strong {
    color: #fff;
  }

  opacity: 0;
  transform: translate(-50%, 0);

  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &::after {
    content: "";

    position: absolute;
    left: 50%;
    top: 100%;

    border: 0.3em solid;
    border-color: transparent #000c #000c transparent;
    border-bottom-right-radius: 0.25em;

    transform: translate(-50%, -50%) rotate(45deg);
  }

  *:hover > & {
    opacity: 1;
    transform: translate(-50%, -0.5em);
  }
`

export default ToolTip
