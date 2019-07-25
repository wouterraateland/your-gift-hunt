import { EDGE_TYPES } from "data"
import React, { useCallback } from "react"

import useEntityGraph from "hooks/useEntityGraph"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameQueries from "hooks/useGameQueries"
import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import { Button, Field, DisguisedSelectOptions } from "ygh-ui"
import Icons from "ygh-icons"
import { components } from "react-select"

import EntityTag from "components/Primitives/EntityTag"
import Transition from "components/Primitives/Transition"

import DefaultUnlockConditions from "./Default"
import UnlockCondition from "./UnlockCondition"

const Option = ({ data, ...otherProps }) => (
  <components.Option
    {...otherProps}
    cx={(a, b, c) =>
      `${Object.keys(b).reduce(
        (acc, key) => (b[key] ? `${acc} ${key}` : acc),
        a
      )} ${c}`
    }
  >
    <EntityTag entity={data.entity}>
      <Transition from={data.from} to={data.to} />
    </EntityTag>
  </components.Option>
)

const EditableUnlockConditions = ({ entity, state }) => {
  const { edges, getEdgeById } = useEntityGraph()
  const { getNextNodes } = useEntityDependencies()
  const { getStateById, getEntityByStateId } = useGameQueries()
  const {
    addUnlockToStateTransition,
    removeUnlockFromStateTransition
  } = useGameMutations()

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === state.id)
    .map(({ from, to, ...edge }) => ({
      ...edge,
      entity: getEntityByStateId(from),
      from: getStateById(from),
      to: getStateById(to)
    }))

  const nextNodes = getNextNodes(state.id)
  const options = edges
    .filter(
      ({ from, type }) =>
        [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type) &&
        !nextNodes.includes(from)
    )
    .map(({ from, to, ...edge }) => ({
      ...edge,
      value: edge.id,
      entity: getEntityByStateId(from),
      from: getStateById(from),
      to: getStateById(to)
    }))
    .filter(
      edge =>
        edge.entity.id !== entity.id &&
        unlockConditions.every(unlockCondition =>
          edge.entity.states.every(({ id }) => id !== unlockCondition.from.id)
        )
    )

  const [{ isLoading, error }, runAsync] = useAsync()

  const onChange = useCallback(
    runAsync(event =>
      Promise.all(
        event.target.value
          .map(edgeId => options.find(option => option.value === edgeId))
          .filter(edge => !!edge)
          .map(edge =>
            addUnlockToStateTransition(
              edge.from.id,
              edge.to ? edge.to.id : null,
              state.id
            )
          )
      )
    ),
    [state, options]
  )

  const removeUnlockCondition = useCallback(
    runAsync(id => {
      const edge = getEdgeById(id)
      return removeUnlockFromStateTransition(
        edge.from,
        edge.to.endsWith("-exit") ? null : edge.to,
        state.id
      )
    }),
    [state, edges]
  )

  if (error) {
    console.error(error)
  }

  return (
    <>
      {unlockConditions.length ? (
        unlockConditions.map(unlockCondition => (
          <UnlockCondition
            key={unlockCondition.id}
            {...unlockCondition}
            onDeleteClick={() => removeUnlockCondition(unlockCondition.id)}
          />
        ))
      ) : (
        <DefaultUnlockConditions entity={entity} />
      )}
      <Field
        component={DisguisedSelectOptions}
        components={{
          Option
        }}
        block
        options={options}
        isMulti
        value={unlockConditions.map(({ id }) => id)}
        onChange={onChange}
        error={error}
        disabled={isLoading}
        render={props => (
          <Button
            {...props}
            size="small"
            importance="primary"
            color="primary"
            lead={<Icons.Plus />}
          >
            Add condition
          </Button>
        )}
      />
    </>
  )
}

export default EditableUnlockConditions
