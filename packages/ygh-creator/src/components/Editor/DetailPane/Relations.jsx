import { ACTION_TYPES, NODE_TYPES } from "data"

import React, { useContext } from "react"
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

const ActionRequirement = ({ type, payload }) => {
  const { requiredValues, requiredEntity } = payload

  switch (type) {
    case ACTION_TYPES.USE:
    case ACTION_TYPES.TARGET_OF_USE:
      const { entity, state } = requiredEntity
      const { inspectNode } = useContext(InspectorContext)
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
          <span
            style={{ cursor: "pointer" }}
            onClick={() => inspectNode(node.id)}
          >
            <EntityTag {...node.instance.entity}>
              {node.instance.entity.name}
            </EntityTag>
            <StateTag>{node.state.state.name}</StateTag>
          </span>{" "}
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

const Transition = ({ from, to, requiredActions }) => (
  <TransitionContainer>
    <ClickableStateTag {...from} />
    <Arrow>&rarr;</Arrow>
    <ClickableStateTag {...to} /> when:
    <ActionRequirementList>
      {requiredActions.map((actionRequirement, i) => (
        <ActionRequirement key={i} {...actionRequirement} />
      ))}
    </ActionRequirementList>
  </TransitionContainer>
)

const Relations = ({ node }) => {
  const { getNodeByInstanceAndState } = useContext(GameContext)
  const outgoingTransitions = node.state.state.outgoingTransitions

  return outgoingTransitions.length ? (
    <>
      <h3>Transitions</h3>
      {outgoingTransitions.map(transition => {
        const nextNode = getNodeByInstanceAndState(node.instance, transition.to)

        return (
          <Transition
            key={[node.id, nextNode.id]}
            from={node}
            to={nextNode}
            requiredActions={transition.requiredActions}
          />
        )
      })}
    </>
  ) : null
}

export default Relations
