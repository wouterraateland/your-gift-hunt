import styled from "styled-components"

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

const or0 = or(0)
const or50 = or("50%")

const EntityContainer = styled.div.attrs(props => ({
  style: {
    width: or0(props.width),
    height: or0(props.height),
    top: props.bottom !== undefined ? undefined : or50(props.top),
    left: props.right !== undefined ? undefined : or50(props.left),
    bottom: props.bottom !== undefined ? or50(props.bottom) : undefined,
    right: props.right !== undefined ? or50(props.right) : undefined,
    transformOrigin: `${or50(props.origin.left)} ${or50(props.origin.top)}`,
    transform: `translate(${props.right !== undefined ? "" : "-"}${or50(
      props.origin.left
    )}, ${props.bottom !== undefined ? "" : "-"}${or50(
      props.origin.top
    )}) rotate(${props.rotation}deg)`,
    zIndex: props.z
  }
}))`
  pointer-events: ${props => (props.isInteractive ? "auto" : "none")};
  position: absolute;
`

EntityContainer.defaultProps = {
  isInteractive: true
}

export default EntityContainer
