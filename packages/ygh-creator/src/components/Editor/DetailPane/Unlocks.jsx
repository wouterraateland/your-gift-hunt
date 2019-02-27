import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import { Select } from "your-gift-hunt/ui"
import NodeTag from "../NodeTag"
import ClickableNodeTag from "./ClickableNodeTag"

const SelectLabel = ({ data }) => <ClickableNodeTag {...data.label} />

const SelectOptionContainer = styled.div`
  padding: 0.5em;
  &:not(:last-child) {
    border-bottom: 1px solid #0001;
  }
`

const SelectOption = ({ innerProps, data }) => {
  return (
    <SelectOptionContainer {...innerProps}>
      <NodeTag {...data.label} />
    </SelectOptionContainer>
  )
}

const Unlocks = ({ from, to }) => {
  const { edges, nodes } = useContext(GameContext)
  const unlockEdges = edges.filter(
    edge =>
      edge.type === EDGE_TYPES.UNLOCK &&
      edge.from === from.id &&
      edge.to === to.id
  )
  const [state, setState] = useState(unlockEdges.map(({ unlocks }) => unlocks))

  const onChange = event => setState(event.target.value)

  return (
    <Select
      label="Unlocks"
      placeholder="Nothing"
      block
      isMulti
      components={{
        MultiValueLabel: SelectLabel,
        Option: SelectOption
      }}
      onChange={onChange}
      options={nodes
        .filter(({ type }) => type === NODE_TYPES.STATE)
        .map(node => ({ label: node, value: node.id }))}
      value={state}
    />
  )
}

export default Unlocks
