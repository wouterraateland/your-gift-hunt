import styled from "styled-components"

export { default as Logo } from "./Logo"
export { default as Twitter } from "./Twitter"
export { default as Facebook } from "./Facebook"

export { default as Friend } from "./challenges/Friend"
export { default as Location } from "./challenges/Location"
export { default as Picture } from "./challenges/Picture"
export { default as Question } from "./challenges/Question"
export { default as Seek } from "./challenges/Seek"
export { default as Time } from "./challenges/Time"

export { default as Edit } from "./Edit"
export { default as Cog } from "./Cog"

const Icon = styled.svg`
  height: ${props => props.size}em;

  fill: currentColor;
  stroke: currentColor;
  stroke-width: 0;
`

Icon.defaultProps = {
  size: 1
}

export default Icon
