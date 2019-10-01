import { css } from "styled-components"
import _ from "ygh-utils"

const plankStyles = css`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;

    box-shadow: inset 0.125em 0 0.0625em #fff2, inset -0.125em 0 0.0625em #0002,
      inset 0 0.05em 0.02em #0002, inset 0 -0.05em 0.02em #0002;

    background-image: linear-gradient(85deg, #ffffff03 50%, transparent 50%),
      linear-gradient(87deg, #ffffff03 50%, transparent 50%),
      linear-gradient(83deg, transparent 50%, #ffffff04 50%),
      linear-gradient(84deg, transparent 50%, #ffffff04 50%);

    background-color: ${props => props.color};
    background-size: 13px, 29px, 37px, 53px;
  }

  &:nth-of-type(3n + 1)::before {
    background-image: linear-gradient(95deg, #ffffff03 50%, transparent 50%),
      linear-gradient(97deg, #ffffff03 50%, transparent 50%),
      linear-gradient(93deg, transparent 50%, #ffffff04 50%),
      linear-gradient(94deg, transparent 50%, #ffffff04 50%);
  }

  &:nth-of-type(3n + 2)::before {
    background-image: linear-gradient(89deg, #ffffff03 50%, transparent 50%),
      linear-gradient(92deg, #ffffff03 50%, transparent 50%),
      linear-gradient(91deg, transparent 50%, #ffffff04 50%),
      linear-gradient(87deg, transparent 50%, #ffffff04 50%);
  }

  &:nth-of-type(5n + 2)::before {
    background-color: ${props => _.darken(-0.02)(props.color)};
  }
  &:nth-of-type(7n + 1)::before,
  &:nth-of-type(7n + 5)::before {
    background-color: ${props => _.darken(0.02)(props.color)};
  }
`
export default plankStyles
