import { ACTION_TYPES, NODE_TYPES } from "data"

import React, { Fragment, useContext } from "react"
import styled from "styled-components"

import EntitiesContext from "contexts/Entities"
import InspectorContext from "contexts/Inspector"
import GameContext from "contexts/Game"

import { InputType } from "your-gift-hunt/ui"
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

const ActionRequirementList = styled.ul`
  padding: 0;
  margin: 1em 0 0;
`

const Li = styled.li`
  display: block;
  padding: 0;

  &::before {
    content: "\u2192";

    font-weight: bold;

    margin-right: 0.5em;

    color: ${props => (props.type === "use" ? "#3f9" : "currentColor")};
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

const ClickableNodeTag = ({ id, instance, state, type }) => {
  const { inspectNode } = useContext(InspectorContext)

  return (
    <span style={{ cursor: "pointer" }} onClick={() => inspectNode(id)}>
      <EntityTag {...instance.entity} />
      <StateTag type={type}>{state && state.state.name}</StateTag>
    </span>
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

const TransitionWithRequirements = ({ from, to, requiredActions = [] }) => (
  <TransitionContainer>
    <Transition from={from} to={to} /> when:
    <ActionRequirementList>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </ActionRequirementList>
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
        <Fragment key={i}>
          {i !== 0 && " and "}
          {from.type === NODE_TYPES.ENTRY ? (
            <StateTag type={NODE_TYPES.ENTRY} />
          ) : (
            <Transition withEntity from={from} to={to} />
          )}
        </Fragment>
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
