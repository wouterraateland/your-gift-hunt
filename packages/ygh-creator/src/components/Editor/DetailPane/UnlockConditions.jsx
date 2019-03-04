import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useRef, useContext, useState, useCallback } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import { useApolloClient } from "react-apollo-hooks"
import useClickOutside from "hooks/useClickOutside"
import useAsync from "hooks/useAsync"

import { ENTITY_INSTANCE_STATE_TRANSITIONS } from "gql/queries"

import { Paper, ActionButton, Button } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"

import Transition from "./Transition"

const OptionsLocation = styled.div`
  position: relative;
`

const UnlockConditionContainer = styled.div`
  display: block;
  margin-bottom: .5em;

  &::before {
    content: ${props =>
      props.type === EDGE_TYPES.ENTRY ? '"\u2022"' : '"\u2192"'};

    margin-right: .5em;

    font-weight: bold;

    color: #39f;
  }
}),
`

const UnlockCondition = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockConditionContainer type={data.from.type}>
    <Transition withEntity {...data} />
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockConditionContainer>
)

const OptionsContainer = styled(Paper)`
  display: ${props => (props.isVisible ? "block" : "none")};

  position: absolute;
  left: 0;
  bottom: calc(100% + 1em);

  overflow-y: auto;

  min-width: 21em;
  height: 15em;

  line-height: 1.3;
  text-align: left;

  background: #fff;
`

const OptionContainer = styled.div`
  padding: 0.5em;
  &:hover {
    background-color: #0001;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #0001;
  }

  & > * {
    pointer-events: none;
  }
`

const Option = ({ onClick, data }) => {
  return (
    <OptionContainer onClick={onClick}>
      <Transition withEntity {...data} />
    </OptionContainer>
  )
}

const Options = ({
  options,
  onOptionClick,
  onClose,
  isVisible,
  closeOnClick = false
}) => {
  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: onClose })

  return (
    <OptionsContainer ref={ref} isVisible={isVisible}>
      {options.map(option => (
        <Option
          key={option.id}
          data={option}
          onClick={() => {
            onOptionClick(option.id)
            if (closeOnClick) {
              onClose()
            }
          }}
        />
      ))}
    </OptionsContainer>
  )
}

const DefaultUnlock = () => (
  <UnlockCondition
    data={{ from: { type: NODE_TYPES.ENTRY } }}
    isDeletable={false}
  />
)

const EditableUnlockConditions = ({ node }) => {
  const {
    edges,
    getEdgeById,
    getNodeById,
    startTriggerStateTransition,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition
  } = useContext(GameContext)

  const client = useApolloClient()

  const transitions = edges
    .filter(({ type }) =>
      [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type)
    )
    .map(({ id, from, to }) => ({
      id,
      from: getNodeById(from),
      to: getNodeById(to)
    }))

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === node.id)
    .map(({ id }) => getEdgeById(id))

  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading }, runAsync] = useAsync()

  const addUnlockCondition = useCallback(
    runAsync(async id => {
      if (
        !unlockConditions.find(unlockCondition => unlockCondition.id === id)
      ) {
        if (unlockConditions.length === 0) {
          // If we add the first unlock condition, remove the unlock condition from the start trigger
          await removeUnlockFromEntityInstanceStateTransition(
            startTriggerStateTransition.id,
            node.state.id
          )
        }

        const edge = getEdgeById(id)
        const {
          data: { entityInstanceStateTransitions }
        } = await client.query({
          query: ENTITY_INSTANCE_STATE_TRANSITIONS,
          variables: { from: edge.from.id, to: edge.to.id }
        })

        await addUnlockToEntityInstanceStateTransition(
          entityInstanceStateTransitions[0].id,
          node.state.id
        )
      }
    }),
    [edges, unlockConditions]
  )

  const removeUnlockCondition = useCallback(
    runAsync(async id => {
      if (unlockConditions.find(unlockCondition => unlockCondition.id === id)) {
        if (unlockConditions.length === 1) {
          // If we remove the only unlock condition, replace it with an unlock from a start trigger
          await addUnlockToEntityInstanceStateTransition(
            startTriggerStateTransition.id,
            node.state.id
          )
        }

        const edge = getEdgeById(id)
        const {
          data: { entityInstanceStateTransitions }
        } = await client.query({
          query: ENTITY_INSTANCE_STATE_TRANSITIONS,
          variables: { from: edge.from.id, to: edge.to.id }
        })

        await removeUnlockFromEntityInstanceStateTransition(
          entityInstanceStateTransitions[0].id,
          node.state.id
        )
      }
    }),
    [edges, unlockConditions]
  )

  const onAddButtonClick = useCallback(() => setOptionsVisibility(true), [])
  const onOptionsClose = useCallback(() => setOptionsVisibility(false), [])
  const onOptionClick = useCallback(id => addUnlockCondition(id), [
    addUnlockCondition
  ])

  return (
    <>
      {unlockConditions.length ? (
        unlockConditions.map(unlockCondition => (
          <UnlockCondition
            key={unlockCondition.id}
            data={unlockCondition}
            onDeleteClick={() => removeUnlockCondition(unlockCondition.id)}
          />
        ))
      ) : (
        <DefaultUnlock />
      )}
      <OptionsLocation>
        <Options
          closeOnClick
          options={transitions}
          onClose={onOptionsClose}
          onOptionClick={onOptionClick}
          isVisible={optionsVisible}
        />
      </OptionsLocation>
      <Button
        disabled={isLoading}
        onClick={onAddButtonClick}
        size="small"
        importance="primary"
        color="accent"
      >
        + Add unlock
      </Button>
    </>
  )
}

const UnlockConditions = ({ node }) => (
  <Paper>
    <Paper.Section>
      <Paper.Title size={3}>Unlocked when</Paper.Title>
      {node.instance.entity.isObject ? (
        <DefaultUnlock />
      ) : (
        <EditableUnlockConditions node={node} />
      )}
    </Paper.Section>
  </Paper>
)

const MaybeUnlockConditions = ({ node }) => {
  const { getEntityStateById } = useContext(EntitiesContext)

  const entityState = getEntityStateById(node.state.state.id)

  return entityState.incomingTransitions.length === 0 ||
    (node.instance.entity.defaultState &&
      entityState.id === node.instance.entity.defaultState.id) ? (
    <UnlockConditions node={node} />
  ) : null
}

export default MaybeUnlockConditions
