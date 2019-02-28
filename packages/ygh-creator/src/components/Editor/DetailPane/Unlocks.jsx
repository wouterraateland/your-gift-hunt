import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import Select from "react-select"
import { Button } from "your-gift-hunt/ui"
import NodeTag from "../NodeTag"
import ClickableNodeTag from "./ClickableNodeTag"

const MultiValueLabel = ({ data }) => <ClickableNodeTag {...data.label} />

const DropdownIndicator = ({ innerProps }) => (
  <Button {...innerProps} size="small" importance="primary" color="accent">
    + Add unlock
  </Button>
)

const OptionContainer = styled.div`
  padding: 0.5em;
  &:not(:last-child) {
    border-bottom: 1px solid #0001;
  }
`

const Option = ({ innerProps, data }) => {
  return (
    <OptionContainer {...innerProps}>
      <NodeTag {...data.label} />
    </OptionContainer>
  )
}

const styles = {
  control: () => ({
    position: "relative"
  }),
  indicatorContainer: () => ({
    marginTop: ".5em"
  }),
  indicatorSeparator: () => ({
    display: "inline-block",
    ":not(:first-child)": {
      width: ".5em"
    }
  }),
  placeholder: () => ({
    marginBottom: ".5em",
    fontStyle: "italic",
    color: "#0006"
  }),
  input: () => ({
    display: "none"
  }),
  valueContainer: () => ({
    display: "block"
  }),
  multiValue: () => ({
    display: "block",
    marginBottom: ".5em",
    "::before": {
      content: '"\u2192"',
      marginRight: ".5em",
      fontWeight: "bold",
      color: "#39f"
    }
  }),
  multiValueRemove: () => ({
    cursor: "pointer",
    display: "inline-block",
    width: "1.4em",
    height: "1.4em",
    padding: ".1em",
    marginLeft: ".5em",
    borderRadius: "100%",
    fontSize: "smaller",
    textAlign: "center",
    backgroundColor: "#0002",
    ":hover": {
      backgroundColor: "#FFBDAD",
      color: "#DE350B"
    }
  })
}

const getValue = node => `${node.instance.entity.name} ${node.state.state.name}`

const Unlocks = ({ from, to }) => {
  const { edges, nodes, getNodeById } = useContext(GameContext)
  const unlockEdges = edges.filter(
    edge =>
      edge.type === EDGE_TYPES.UNLOCK &&
      edge.from === from.id &&
      edge.to === to.id
  )
  const [state, setState] = useState(
    unlockEdges
      .map(({ unlocks }) => getNodeById(unlocks))
      .map(node => ({ label: node, value: getValue(node) }))
  )

  return (
    <Select
      placeholder="Nothing"
      isMulti
      menuPlacement="auto"
      isClearable={false}
      components={{
        MultiValueLabel,
        Option,
        DropdownIndicator
      }}
      styles={styles}
      onChange={v => setState(v)}
      options={nodes
        .filter(({ type }) => type === NODE_TYPES.STATE)
        .map(node => ({ label: node, value: getValue(node) }))}
      value={state}
    />
  )
}

export default Unlocks
