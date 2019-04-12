import React from "react"
import styled from "styled-components"

import Hints from "./Hints"
import Inventory from "./Inventory"

const SidebarContainer = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: 0.5em;

  @media (orientation: portrait) {
    height: 7.5em;
    padding-top: 2em;
    margin-top: -2em;
    background-image: radial-gradient(
      ellipse 150% 100% at 50% 100%,
      #332f2e 85%,
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
      #332f2e 85%,
      #0004 86%,
      transparent
    );
  }
`

const Sidebar = () => (
  <SidebarContainer>
    <Hints />
    <Inventory />
  </SidebarContainer>
)

export default Sidebar
