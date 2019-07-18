import styled, { css } from "styled-components"

const DetailPaneBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;

  width: 25em;
  padding: 4.5em 0 1em;
  max-width: 100%;
  border-left: 1px solid #0002;

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

  will-change: transform;
`

export default DetailPaneBackground
