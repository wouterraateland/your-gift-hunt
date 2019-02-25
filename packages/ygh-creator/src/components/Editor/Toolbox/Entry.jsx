import React from "react"
import styled from "styled-components"

import { ToolTip } from "your-gift-hunt/ui"

const ToolboxEntry = styled.div`
  cursor: pointer;

  position: relative;
  width: 3em;
  height: 3em;
  padding: 0.5em;

  text-align: center;

  &:hover {
    background-color: #0002;
  }

  &:first-child {
    border-radius: 0.25em 0.25em 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.25em 0.25em;
  }
`

export default ({ icon: Icon, label }) => (
  <ToolboxEntry>
    <Icon size={2} />
    <ToolTip right>{label}</ToolTip>
  </ToolboxEntry>
)
