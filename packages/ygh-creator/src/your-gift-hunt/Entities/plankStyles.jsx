import { css } from "styled-components"
import { darken } from "utils/colors"

const plankStyles = css`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;

    box-shadow:
      inset .125em 0 .0625em #fff2,
      inset -.125em 0 .0625em #0002,
      inset 0 .05em .02em #0002,
      inset 0 -.05em .02em #0002;

    background-image:
      linear-gradient(85deg, #ffffff03 50%, transparent 50%),
      linear-gradient(87deg, #ffffff03 50%, transparent 50%),
      linear-gradient(83deg, transparent 50%, #ffffff04 50%),
      linear-gradient(84deg, transparent 50%, #ffffff04 50%);

    background-color: ${props => props.baseColor};
    background-size: 13px, 29px, 37px, 53px;
  }

  &:nth-child(3n + 1)::before {
    background-image:
      linear-gradient(95deg, #ffffff03 50%, transparent 50%),
      linear-gradient(97deg, #ffffff03 50%, transparent 50%),
      linear-gradient(93deg, transparent 50%, #ffffff04 50%),
      linear-gradient(94deg, transparent 50%, #ffffff04 50%);
  }

  &:nth-child(3n + 2)::before {
    background-image:
      linear-gradient(89deg, #ffffff03 50%, transparent 50%),
      linear-gradient(92deg, #ffffff03 50%, transparent 50%),
      linear-gradient(91deg, transparent 50%, #ffffff04 50%),
      linear-gradient(87deg, transparent 50%, #ffffff04 50%);
  }

  &:nth-child(5n + 2)::before {
    background-color: ${props => darken(-0.02)(props.baseColor)};
  }
  &:nth-child(7n + 1)::before,
  &:nth-child(7n + 5)::before {
    background-color: ${props => darken(0.02)(props.baseColor)};
  }
}
`
export default plankStyles
