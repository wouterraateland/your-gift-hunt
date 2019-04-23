import { NODE_TYPES } from "data"

import React from "react"
import styled from "styled-components"

import EntryState from "./EntryState"
import ExitState from "./ExitState"

import { ToolTip } from "your-gift-hunt/ui"

const SpecialTag = styled.span`
  position: relative;

  display: inline-block;
  width: 2.4em;
  height: 2.4em;
  border: 1.2em solid transparent;

  font-size: 0.5em;
`

const StateTag = styled.span`
  display: inline-block;
  margin: 0;
  padding: 0.25em 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  font-size: smaller;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1;

  background-color: #999;
  color: #fff;
`

export default ({ type, name }) => {
  switch (type) {
    case NODE_TYPES.ENTRY:
      return (
        <SpecialTag>
          <EntryState />
          <ToolTip>Game starts</ToolTip>
        </SpecialTag>
      )
    case NODE_TYPES.EXIT:
      return (
        <SpecialTag>
          <ExitState />
          <ToolTip>Exit state</ToolTip>
        </SpecialTag>
      )
    default:
      return <StateTag>{name || "Default"}</StateTag>
  }
}
