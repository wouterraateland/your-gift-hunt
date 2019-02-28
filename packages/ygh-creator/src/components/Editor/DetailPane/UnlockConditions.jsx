import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import Select from "react-select"
import { Paper, Button } from "your-gift-hunt/ui"
import Transition from "./Transition"

const MultiValueLabel = ({ data }) => <Transition withEntity {...data.label} />

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
      <Transition withEntity {...data.label} />
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
  multiValue: (_, { data }) => ({
    display: "block",
    marginBottom: ".5em",
    "::before": {
      content:
        data.label.from.type === NODE_TYPES.ENTRY ? '"\u2022"' : '"\u2192"',
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

const getValue = ({ from, to }) =>
  `${from.instance.name}(${from.state ? from.state.state.name : "entry"}) -> (${
    to.state ? to.state.state.name : "exit"
  })`

const UnlockConditions = ({ node }) => {
  const { edges, getNodeById } = useContext(GameContext)

  const transitions = edges
    .filter(({ type }) =>
      [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type)
    )
    .map(({ from, to }) => ({
      from: getNodeById(from),
      to: getNodeById(to)
    }))

  const unlocks = edges
    .filter(
      ({ unlocks, type, to }) =>
        unlocks === node.id || (type === NODE_TYPES.ENTRY && to === node.id)
    )
    .map(({ from, to }) => ({
      from: getNodeById(from),
      to: getNodeById(to)
    }))

  const [state, setState] = useState(
    unlocks.map(transition => ({
      label: transition,
      value: getValue(transition)
    }))
  )

  return unlocks.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>Unlocked when</Paper.Title>
        <Select
          isMulti
          isClearable={false}
          onChange={v => setState(v)}
          styles={styles}
          components={{
            MultiValueLabel,
            Option,
            DropdownIndicator
          }}
          options={transitions.map(transition => ({
            label: transition,
            value: getValue(transition)
          }))}
          value={state}
        />
      </Paper.Section>
    </Paper>
  ) : null
}

export default UnlockConditions
