import { NODE_TYPES } from "data"

import React from "react"
import styled from "styled-components"

import EntryState from "./EntryState"
import ExitState from "./ExitState"

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
  padding: 0.1em 0.5em;

  font-size: smaller;
  text-transform: uppercase;
  font-weight: bold;

  background: #0006;
  color: #fff;
`

export default ({ type, ...otherProps }) => {
  switch (type) {
    case NODE_TYPES.ENTRY:
      return (
        <SpecialTag>
          <EntryState />
        </SpecialTag>
      )
    case NODE_TYPES.EXIT:
      return (
        <SpecialTag>
          <ExitState />
        </SpecialTag>
      )
    default:
      return <StateTag {...otherProps} />
  }
}
