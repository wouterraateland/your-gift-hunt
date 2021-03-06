import styled from "styled-components"
import Entity from "../Entity"

const s = 1
const Armchair = styled(Entity)`
  border-radius: 0.5em;

  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5),
      transparent,
      transparent,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.2),
      transparent,
      transparent,
      rgba(0, 0, 0, 0.5)
    ),
    radial-gradient(
        hsl(0, 100%, 27%) 4%,
        hsl(0, 100%, 18%) 9%,
        hsla(0, 100%, 20%, 0) 9%
      )
      0 0,
    radial-gradient(
        hsl(0, 100%, 27%) 4%,
        hsl(0, 100%, 18%) 8%,
        hsla(0, 100%, 20%, 0) 10%
      )
      ${s}em ${s}em,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) ${s}em 0,
    radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 ${s}em,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) ${s}em
      0,
    radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%)
      ${2 * s}em ${s}em,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
    radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) ${s}em
      ${s}em,
    linear-gradient(
        45deg,
        hsla(0, 100%, 20%, 0) 49%,
        hsla(0, 100%, 0%, 1) 50%,
        hsla(0, 100%, 20%, 0) 70%
      )
      0 0,
    linear-gradient(
        -45deg,
        hsla(0, 100%, 20%, 0) 49%,
        hsla(0, 100%, 0%, 1) 50%,
        hsla(0, 100%, 20%, 0) 70%
      )
      0 0;

  &::before,
  &::after {
    background: radial-gradient(
          hsl(0, 100%, 27%) 4%,
          hsl(0, 100%, 18%) 9%,
          hsla(0, 100%, 20%, 0) 9%
        )
        0 0,
      radial-gradient(
          hsl(0, 100%, 27%) 4%,
          hsl(0, 100%, 18%) 8%,
          hsla(0, 100%, 20%, 0) 10%
        )
        ${s}em ${s}em,
      radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) ${s}em
        0,
      radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0
        ${s}em,
      radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%)
        ${s}em 0,
      radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%)
        ${2 * s}em ${s}em,
      radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0,
      radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) ${s}em
        ${s}em,
      linear-gradient(
          45deg,
          hsla(0, 100%, 20%, 0) 49%,
          hsla(0, 100%, 0%, 1) 50%,
          hsla(0, 100%, 20%, 0) 70%
        )
        0 0,
      linear-gradient(
          -45deg,
          hsla(0, 100%, 20%, 0) 49%,
          hsla(0, 100%, 0%, 1) 50%,
          hsla(0, 100%, 20%, 0) 70%
        )
        0 0;
  }

  &,
  &::before,
  &::after {
    background-color: #300;
    background-size: ${2 * s}em ${2 * s}em;
  }

  &::after {
    left: 1em;
    right: 1em;
    bottom: 0;

    height: 1em;
    border-radius: 0.25em;

    box-shadow: inset 0 -0.25em 0.25em rgba(0, 0, 0, 0.6),
      inset 0 0.25em 0.25em rgba(0, 0, 0, 0.6),
      0 -0.25em 1em 0.5em rgba(0, 0, 0, 0.7);
  }

  &::before {
    left: 1em;
    top: -0.25em;
    right: 1em;
    bottom: 1em;

    border-radius: 0.5em;

    box-shadow: inset 0 0.375em 1.5em rgba(0, 0, 0, 0.2),
      inset 0.125em 0 0.25em rgba(0, 0, 0, 0.4),
      inset 0.375em 0 1.5em rgba(0, 0, 0, 0.2),
      inset -0.125em 0 0.25em rgba(0, 0, 0, 0.4),
      inset -0.375em 0 1.5em rgba(0, 0, 0, 0.2),
      inset 0 0.125em 0.25em rgba(0, 0, 0, 0.4) !important;
  }
`
Armchair.name = "Armchair"
Armchair.templateName = "Armchair"
Armchair.defaultProps = {
  ...Entity.defaultProps,
  width: 6,
  height: 5,
  z: 2
}

export default Armchair
