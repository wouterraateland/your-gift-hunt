import styled from 'styled-components'
import { darken } from 'utils/colors'

export const Plank = styled.div`
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

  &:nth-child(3n + 1) {
    background-image:
      linear-gradient(95deg, #ffffff03 50%, transparent 50%),
      linear-gradient(97deg, #ffffff03 50%, transparent 50%),
      linear-gradient(93deg, transparent 50%, #ffffff04 50%),
      linear-gradient(94deg, transparent 50%, #ffffff04 50%);
  }

  &:nth-child(3n + 2) {
    background-image:
      linear-gradient(89deg, #ffffff03 50%, transparent 50%),
      linear-gradient(92deg, #ffffff03 50%, transparent 50%),
      linear-gradient(91deg, transparent 50%, #ffffff04 50%),
      linear-gradient(87deg, transparent 50%, #ffffff04 50%);
  }

  background-color: ${props => props.baseColor};
  &:nth-child(5n + 2) {
    background-color: ${props => darken(-.02, props.baseColor)};
  }
  &:nth-child(7n + 1),
  &:nth-child(7n + 5) {
    background-color: ${props => darken(.02, props.baseColor)};
  }

  background-size: 13px, 29px, 37px, 53px;
`

Plank.defaultProps = {
  baseColor: '#b38d5c'
}

export default Plank
