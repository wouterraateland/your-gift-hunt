import React from "react"
import styled, { css } from "styled-components"

import { useYGHPlayerContext } from "ygh-sdk"

import HintsIndicator from "./HintsIndicator"
import Inventory from "./Inventory"
import MenuToggle from "./MenuToggle"

const SidebarContainer = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;

  @media (orientation: portrait) {
    height: 7.5em;
    padding-top: 2em;
    margin-top: -2em;
    background-image: radial-gradient(
      ellipse 150% 100% at 50% 100%,
      #332f2e 83%,
      #999 84%,
      #fff 85%,
      #0004 86%,
      transparent
    );
  }

  @media (orientation: landscape) {
    flex-direction: column;
    width: 7.5em;
    padding-right: 2em;
    margin-right: -2em;
    background-image: radial-gradient(
      ellipse 100% 150% at 0% 50%,
      #332f2e 83%,
      #fff 84%,
      #999 85%,
      #0004 86%,
      transparent
    );
  }

  ${props =>
    !props.isInteractive &&
    css`
      & * {
        pointer-events: none !important;
      }
    `}
`

const Sidebar = () => {
  const { gameState } = useYGHPlayerContext()

  return (
    <SidebarContainer
      isInteractive={gameState.startedAt && !gameState.finishedAt}
    >
      <HintsIndicator />
      <Inventory />
      <MenuToggle />
    </SidebarContainer>
  )
}

export default Sidebar
