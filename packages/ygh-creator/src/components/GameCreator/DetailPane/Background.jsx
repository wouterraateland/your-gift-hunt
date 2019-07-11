import styled, { css } from "styled-components"

import { Paper } from "ygh-ui"

const DetailPaneBackground = styled(Paper.Container)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;

  width: 25em;
  padding: 4.5em 1em 1em;
  max-width: 100%;
  border-radius: 0;
  margin: 0 !important;

  transform: translate3D(${props => (props.isOpen ? 0 : 100)}%, 0, 0);

  background-color: #f2f2f2;
  ${props =>
    props.hasPreview &&
    css`
      background-attachment: local;
      background-image: radial-gradient(
        ellipse 50em 15em at 50% 0,
        #39f9,
        transparent
      );
    `}

  transition: transform ease-in-out 0.3s;

  will-change: transition;

  @media (min-width: 40em) {
    padding: 1em;
  }
`

export default DetailPaneBackground
