import React from "react"
import styled, { css, createGlobalStyle } from "styled-components"

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  ${props =>
    props.isItem &&
    css`
      &::before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;

        width: 2em;
        height: 2em;

        background-color: #0001;
        transform: translate(-50%, -50%);
      }
    `}
`

const withCenter = isItem => story => <Center isItem={isItem}>{story()}</Center>

export default withCenter
