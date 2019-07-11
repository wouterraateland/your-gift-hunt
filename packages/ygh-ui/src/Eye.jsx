import styled, { css } from "styled-components"

const Eye = styled.div`
  pointer-events: auto;

  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  margin: 0 0.5em 0 0.25em;

  &::before,
  &::after {
    content: "";

    position: absolute;
    left: 50%;
    top: 50%;
  }

  &::before {
    width: 100%;
    height: 100%;

    border: 0.1em solid;
    border-radius: 60% 0;

    background-image: radial-gradient(currentColor 45%, transparent 50%);

    ${props =>
      !props.isOpen &&
      css`
        clip-path: polygon(
          40% 100%,
          40% 0%,
          0% 0%,
          0% 100%,
          60% 100%,
          60% 0%,
          100% 0%,
          100% 100%
        );
      `}

    transform: translate(-50%, -50%) rotate(45deg);
  }

  ${props =>
    !props.isOpen &&
    css`
      &::after {
        width: 1.5em;
        height: 0.1em;

        background: currentColor;
        transform: translate(-50%, -50%) rotate(-45deg) translate(0, -100%);
      }
    `}
`

export default Eye
