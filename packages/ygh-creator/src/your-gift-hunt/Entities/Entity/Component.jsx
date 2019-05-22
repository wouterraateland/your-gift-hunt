import styled, { css } from "styled-components"

const or = fallback => x => {
  switch (typeof x) {
    case "string":
      return x
    case "number":
      return `${x}em`
    default:
      return fallback
  }
}

const or50 = or("50%")

const EntityComponent = styled.div.attrs(props =>
  props.noVisual
    ? {}
    : {
        style: {
          boxShadow: `
      ${(Math.cos(
        (-(-45 + props.parentRotation + props.rotation) * Math.PI) / 180
      ) *
        props.z) /
        3}em
      ${(Math.sin(
        (-(-45 + props.parentRotation + props.rotation) * Math.PI) / 180
      ) *
        props.z) /
        3}em
      ${props.z / 2}em ${-props.z / 8}em
      #0009`,
          transformOrigin: `${or50(props.origin.left)} ${or50(
            props.origin.top
          )}`
        }
      }
)`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before,
  &::after {
    content: "";

    position: absolute;
  }

  ${props =>
    props.isReachable
      ? props.onClick &&
        css`
          cursor: pointer;
        `
      : !props.isContainer &&
        css`
          opacity: 0;
        `}
`

export default EntityComponent
