import styled, { css } from "styled-components"

const Area = styled.div.attrs(({ top, left, width, height }) => ({
  style: {
    top: `${top * 2}em`,
    left: `${left * 2}em`,
    width: `${width * 2}em`,
    height: `${height * 2}em`
  }
}))`
  position: absolute;

  transition-property: transform, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  will-change: transform, opacity;

  ${props =>
    props.isDragging &&
    css`
      transform: scale(1.05);
      opacity: 0.9;
      z-index: 1;
    `}
`

export default Area
