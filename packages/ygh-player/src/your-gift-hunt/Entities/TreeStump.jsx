import styled, { css } from "styled-components"

import Entity from "./Entity"

const TreeStump = styled(Entity)`
  &,
  &::before,
  &::after {
    border-radius: 80% 110% 90% 100% / 120% 90% 110% 100%;
  }

  &::before,
  &::after {
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }

  &::before {
    box-shadow: -2em -2em 0 -1.25em, 2.25em -1.5em 0 -1.25em, 1.5em 2em 0 -1.5em,
      -1.25em 2em 0 -1.4em;

    color: #765332;
    background-color: currentColor;

    filter: url(#fancy-goo);
  }

  ${props =>
    !props.isCovered &&
    css`
      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 0.125em 0.3em hsl(29, 40%, 23%),
          inset 0 0 0.3em 0.3em hsl(46, 60%, 63%),
          inset 0 0 0.125em 0.7em hsl(41, 50%, 48%),
          inset 0 0 0.125em 0.8em hsla(29, 40%, 23%, 0.5),
          inset 0 0 0.5em 0.8em hsl(41, 50%, 48%),
          inset 0 0 0.125em 1.1em hsl(38, 45%, 39%),
          inset 0 0 0.125em 1.2em hsla(29, 40%, 23%, 0.6),
          inset 0 0 0.125em 1.5em hsl(38, 45%, 39%) !important;
        background-color: hsla(29, 35%, 32%, 1);
      }
    `}
`
TreeStump.name = "TreeStump"
TreeStump.templateName = "Tree stump"
TreeStump.defaultProps = {
  ...Entity.defaultProps,
  z: 2,
  width: 4,
  height: 4
}

export default TreeStump
