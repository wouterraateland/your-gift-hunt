import styled, { css } from "styled-components"

const ToolTip = styled.div`
  pointer-events: none;

  position: absolute;
  z-index: 1;

  padding: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  white-space: nowrap;
  text-align: left;
  line-height: 1.5;
  font-size: 0.8rem;
  font-family: ${props => props.theme.font.copy};

  background: #222;
  color: #fff;

  & strong {
    color: #fff;
  }

  opacity: 0;

  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &::after {
    content: "";

    position: absolute;

    border: 0.4em solid;
    border-color: transparent #222 #222 transparent;
    border-bottom-right-radius: 0.25em;
  }

  *:hover > & {
    opacity: 1;
  }

  ${props =>
    props.right
      ? css`
          left: 100%;
          top: 50%;

          transform: translate(0, -50%);

          &::after {
            right: calc(100% - 1px);
            top: 50%;

            transform: translate(50%, -50%) rotate(135deg);
          }

          *:hover > & {
            transform: translate(0.5em, -50%);
          }
        `
      : css`
          left: 50%;
          bottom: 100%;
          transform: translate(-50%, 0);
          &::after {
            left: 50%;
            top: calc(100% - 1px);

            border-color: transparent #222 #222 transparent;
            border-bottom-right-radius: 0.25em;

            transform: translate(-50%, -50%) rotate(45deg);
          }

          *:hover > & {
            transform: translate(-50%, -0.5em);
          }
        `}
`

export default ToolTip
