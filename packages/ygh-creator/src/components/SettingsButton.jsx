import React from "react"
import styled from "styled-components"
import { Cog } from "ygh-icons"

import { Link } from "@reach/router"

const SettingsButton = styled(Link)`
  cursor: pointer;

  padding: 0;
  margin: 0 0 0 0.5em;
  border: none;

  vertical-align: middle;
  opacity: 0.5;

  svg {
    display: block;
  }
`

export default () => (
  <SettingsButton to="settings">
    <Cog size={0.8} />
  </SettingsButton>
)
