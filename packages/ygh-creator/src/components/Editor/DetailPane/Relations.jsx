import { ACTION_TYPES, EDGE_TYPES, NODE_TYPES } from "data"

import React, { Fragment, useState, useContext } from "react"
import styled from "styled-components"

import EntitiesContext from "contexts/Entities"
import InspectorContext from "contexts/Inspector"
import GameContext from "contexts/Game"

import { InputType, Select } from "your-gift-hunt/ui"
import EntityTag from "../EntityTag"
import StateTag from "../StateTag"

const TransitionContainer = styled.div`
  margin: 0 -1em 1em;
  padding: 1em;

  background: #0001;
`

const Arrow = styled.span`
  margin: 0 0.5em;
  font-weight: bold;

  color: #f93;
`

const Label = styled.span`
  font-size: 0.7em;
  color: #0006;
`

const TransitionList = styled.ul`
  padding: 0;
  margin: 0;
`

const Li = styled.li`
  display: block;
  padding: 0;
  margin-bottom: .5em;

  &::before {
    content: "${props => {
      switch (props.type) {
        case "entry":
          return "\u2022"
        case "add":
          return "+"
        default:
          return "\u2192"
      }
    }}";

    font-weight: bold;

    margin-right: 0.5em;

    color: ${props => {
      switch (props.type) {
        case "use":
          return "#3f9"
        case "unlock":
        case "entry":
          return "#39f"
        default:
          return "currentColor"
      }
    }};
  }
`

const ClickableStateTag = ({ id, type, state }) => {
  const { inspectNode } = useContext(InspectorContext)

  return type === NODE_TYPES.STATE ? (
    <StateTag style={{ cursor: "pointer" }} onClick={() => inspectNode(id)}>
      {state.state.name}
    </StateTag>
  ) : (
    <StateTag type={type} />
  )
}

const NodeTag = ({ instance, state, type, ...otherProps }) => (
  <span style={{ cursor: "pointer" }} {...otherProps}>
    {instance && <EntityTag {...instance.entity} />}
    <StateTag type={type}>{state && state.state.name}</StateTag>
  </span>
)

const ClickableNodeTag = ({ id, ...otherProps }) => {
  const { inspectNode } = useContext(InspectorContext)

  return <NodeTag {...otherProps} onMouseDown={() => inspectNode(id)} />
}

const toInputType = type => {
  switch (type) {
    case "STRING":
      return "text"
    case "NUMBER":
      return "number"
    default:
      return type
  }
}

const FieldLabel = ({ fieldId }) => {
  const { getEntityFieldById } = useContext(EntitiesContext)

  const { label, type, isMulti, isSecret } = getEntityFieldById(fieldId)

  return (
    <strong>
      {label}
      <InputType
        type={toInputType(type)}
        isMulti={isMulti}
        isSecret={isSecret}
      />
    </strong>
  )
}

const ActionRequirement = ({ type, payload }) => {
  const { requiredValues, requiredEntity } = payload

  switch (type) {
    case ACTION_TYPES.USE:
    case ACTION_TYPES.TARGET_OF_USE:
      const { entity, state } = requiredEntity
      const { nodes } = useContext(GameContext)

      const node = nodes.find(
        node =>
          node.instance.entity.id === entity.id &&
          node.state &&
          node.state.state.id === state.id
      )

      return (
        <Li type="use">
          {type === ACTION_TYPES.USE && "Used on"}{" "}
          <ClickableNodeTag {...node} />{" "}
          {type === ACTION_TYPES.TARGET_OF_USE && "is used on this"}
        </Li>
      )
    case ACTION_TYPES.INPUT:
      return requiredValues.length ? (
        requiredValues.map(({ key, eqValue, neqValue, eqField, neqField }) => (
          <Li key={key}>
            Input "{key}" is {(neqValue || neqField) && <u>not</u>} equal to{" "}
            {eqValue}
            {neqValue}
            {eqField && <FieldLabel fieldId={eqField.id} />}
            {neqField && <FieldLabel fieldId={neqField.id} />}
          </Li>
        ))
      ) : (
        <Li>Touched</Li>
      )
    default:
      return (
        <Li>
          {type}: {JSON.stringify(payload)}
        </Li>
      )
  }
}

const Transition = ({ withEntity, from, to }) => (
  <>
    {withEntity && <EntityTag {...from.instance.entity} />}
    <ClickableStateTag {...from} />
    <Arrow>&rarr;</Arrow>
    <ClickableStateTag {...to} />
  </>
)

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

const TransitionUnlocks = ({ from, to }) => {
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
    <>
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
    </>
  )
}

const TransitionWithRequirements = ({ from, to, requiredActions = [] }) => (
  <TransitionContainer>
    <Transition from={from} to={to} />
    <br />
    <br />
    <Label>When</Label>
    <TransitionList>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </TransitionList>
    <br />
    <TransitionUnlocks from={from} to={to} />
  </TransitionContainer>
)

const PreviousStates = ({
  node,
  incomingTransitions,
  getNodeByInstanceAndState
}) =>
  incomingTransitions.length ? (
    <>
      <h3>Previous state{incomingTransitions.length > 1 && "s"}</h3>
      {incomingTransitions.map(({ from }, i) => {
        const prevNode = getNodeByInstanceAndState(node.instance, from)

        return (
          <Fragment key={i}>
            {i !== 0 && " or "}
            <ClickableStateTag {...prevNode} />
          </Fragment>
        )
      })}
    </>
  ) : null

const Unlocks = ({ unlocks }) =>
  unlocks.length ? (
    <>
      <h3>Unlocked when</h3>
      {unlocks.map(({ from, to }, i) => (
        <Li key={i} type={from.type === NODE_TYPES.ENTRY ? "entry" : "unlock"}>
          {i !== 0 && " and "}
          {from.type === NODE_TYPES.ENTRY ? (
            "Game starts"
          ) : (
            <Transition withEntity from={from} to={to} />
          )}
        </Li>
      ))}
    </>
  ) : null

const OutgoingTransitions = ({
  node,
  outgoingTransitions,
  getNodeByInstanceAndState
}) =>
  outgoingTransitions.length ? (
    <>
      <h3>Transitions</h3>
      {outgoingTransitions.map(transition => {
        const nextNode = getNodeByInstanceAndState(node.instance, transition.to)

        return (
          <TransitionWithRequirements
            key={[node.id, nextNode.id]}
            from={node}
            to={nextNode}
            requiredActions={transition.requiredActions}
          />
        )
      })}
    </>
  ) : null

const Relations = ({ node }) => {
  const { getNodeByInstanceAndState, edges, getNodeById } = useContext(
    GameContext
  )
  const { getEntityStateById } = useContext(EntitiesContext)

  const entityState = getEntityStateById(node.state.state.id)
  const incomingTransitions = entityState.incomingTransitions
  const outgoingTransitions = entityState.outgoingTransitions
  const unlocks = edges
    .filter(
      ({ unlocks, type, to }) =>
        unlocks === node.id || (type === NODE_TYPES.ENTRY && to === node.id)
    )
    .map(({ from, to }) => ({
      from: getNodeById(from),
      to: getNodeById(to)
    }))

  return (
    <>
      <Unlocks unlocks={unlocks} />
      <PreviousStates
        node={node}
        incomingTransitions={incomingTransitions}
        getNodeByInstanceAndState={getNodeByInstanceAndState}
        unlocks={unlocks}
      />
      <OutgoingTransitions
        node={node}
        outgoingTransitions={outgoingTransitions}
        getNodeByInstanceAndState={getNodeByInstanceAndState}
      />
    </>
  )
}

export default Relations
