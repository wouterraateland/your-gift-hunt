import { EDGE_TYPES } from "data"
import React, { useCallback } from "react"

import useEntityGraph from "hooks/useEntityGraph"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameQueries from "hooks/useGameQueries"
import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import { ActionButton, Field, ToolTip, DisguisedSelectOptions } from "ygh-ui"
import Icons from "ygh-icons"
import { components } from "react-select"

import EntityTag from "components/Primitives/EntityTag"
import Transition from "components/Primitives/Transition"

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
    <EntityTag entity={data.entity} />(
    <Transition from={data.from} to={data.to} />)
  </components.Option>
)

const EditableUnlockConditions = ({ entity, state }) => {
  const { edges } = useEntityGraph()
  const { getNextNodes } = useEntityDependencies()
  const { getStateById, getEntityByStateId } = useGameQueries()
  const { addUnlockToStateTransition } = useGameMutations()

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

  if (error) {
    console.error(error)
  }

  return (
    <Field
      component={DisguisedSelectOptions}
      components={{
        Option
      }}
      onClick={event => {
        event.stopPropagation()
      }}
      styles={{
        option: base => ({ ...base, padding: ".5rem", lineHeight: "1.5rem" }),
        container: base => ({ ...base, position: "static" }),
        menu: base => ({ ...base, left: 0 })
      }}
      options={options}
      isMulti
      value={unlockConditions.map(({ id }) => id)}
      onChange={onChange}
      error={error}
      disabled={isLoading}
      render={({ onClick, ...props }) => (
        <ActionButton
          {...props}
          onClick={event => {
            event.stopPropagation()
            typeof onClick === "function" && onClick(event)
          }}
          size="small"
          color="primary"
        >
          <Icons.Plus />
          <ToolTip>Add condition</ToolTip>
        </ActionButton>
      )}
    />
  )
}

export default EditableUnlockConditions
