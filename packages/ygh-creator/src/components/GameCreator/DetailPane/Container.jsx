import styled, { css } from "styled-components"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  line-height: 1.5;

  background-color: #f9f9f9;

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
`

export default Container
