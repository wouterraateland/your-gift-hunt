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

export { default as Challenge } from "./entities/Challenge"
export { default as Container } from "./entities/Container"
export { default as Info } from "./entities/Info"
export { default as Item } from "./entities/Item"
export { default as Object } from "./entities/Object"
export { default as Trigger } from "./entities/Trigger"
export { default as Portal } from "./entities/Portal"
export { default as Entrance } from "./entities/Entrance"

export { default as Bin } from "./Bin"
export { default as Cog } from "./Cog"
export { default as Edit } from "./Edit"
export { default as Pen } from "./Pen"

const Icon = styled.svg.attrs(({ size, weight }) => ({
  style: {
    height: `${size}em`,
    strokeWidth: `${weight / 8}em`
  }
}))`
  fill: currentColor;
  stroke: currentColor;
`

Icon.defaultProps = {
  size: 1,
  weight: 1
}

export default Icon
