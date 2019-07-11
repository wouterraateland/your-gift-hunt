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
    left: or50(props.left),
    top: or50(props.top),
    transformOrigin: `${or50(props.origin.left)} ${or50(props.origin.top)}`,
    transform: `translate(-${or50(props.origin.left)}, -${or50(
      props.origin.top
    )}) rotate(${props.rotation}deg)`,
    zIndex: 100 * props.z
  }
}))`
  pointer-events: ${props => (props.isInteractive ? "auto" : "none")};
  position: absolute;
  transition: transform 0.5s ease-out;
`

EntityContainer.defaultProps = {
  isInteractive: true
}

export default EntityContainer
