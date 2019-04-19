import styled, { css } from "styled-components"

import { Input } from "./SingleInput"

const BeforeLabel = styled.div`
  position: relative;

  display: block;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.7em;

  float: left;

  ${props =>
    props.type === "search" &&
    css`
      &::before,
      &::after {
        content: "";
        position: absolute;
      }

      &::before {
        right: 0.1em;
        top: 0.1em;

        width: 1em;
        height: 1em;
        border: 0.2em solid;
        border-radius: 100%;
      }

      &::after {
        left: 0.4em;
        bottom: -0.2em;

        width: 0.2em;
        height: 0.6em;

        background: currentColor;

        transform: translate(-50%, -50%) rotate(45deg);
      }
    `}

  & + ${Input} {
    max-width: calc(100% - 2.5em);
  }
`

BeforeLabel.displayName = "BeforeLabel"

export default BeforeLabel
