import React from "react"
import styled from "styled-components"

import useScreen from "hooks/useScreen"

import Screens from "components/screens"

const Container = styled.div`
  margin: 1em;
`

const Toggle = styled.span`
  cursor: pointer;

  position: relative;

  display: inline-block;
  width: 2em;
  height: 2em;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;

    height: 0.2em;
    border-radius: 0.1em;

    box-shadow: 0 -0.5em, 0 0.5em;

    background-color: currentColor;
    color: #fff;

    transform: translate(0, -50%);
  }
`

const HintsIndicator = () => {
  const { popup } = useScreen()

  return (
    <Container>
      <Toggle onClick={() => popup(Screens.Pause)} />
    </Container>
  )
}

export default HintsIndicator
