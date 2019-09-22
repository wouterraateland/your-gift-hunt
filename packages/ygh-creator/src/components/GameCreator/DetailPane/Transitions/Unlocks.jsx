import { EDGE_TYPES } from "data"
import React, { useCallback } from "react"
import styled from "styled-components"

import useEntityGraph from "hooks/useEntityGraph"
import useGameQueries from "hooks/useGameQueries"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import { components } from "react-select"
import {
  ActionButton,
  ToolTip,
  Float,
  Field,
  DisguisedSelectOptions
} from "ygh-ui"
import Icons from "ygh-icons"
import ClickableEntityTag from "components/GameCreator/ClickableEntityTag"
// import ClickableStateTag from "components/GameCreator/ClickableStateTag"
import EntityTag from "components/Primitives/EntityTag"
// import StateTag from "components/Primitives/StateTag"

const Label = styled.strong`
  display: block;
  width: 100%;
  margin-top: 0.5rem;

  line-height: 1.5rem;
`

const UnlockContainer = styled.div`
  position: relative;

  display: block;
  margin-bottom: 0.5em;

  &::before {
    content: "\u2192";

    margin-right: 0.5em;

    font-weight: bold;

    color: #39f;
  }
`

const Actions = styled.div`
  position: absolute;
  right: -0.25rem;
  top: 50%;
  transform: translate(0, -50%);
`

const Em = styled.em`
  display: block;
  margin-bottom: 0.5em;
`

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
      {/* {" "}
      <StateTag state={data.state} /> */}
    </EntityTag>
  </components.Option>
)

const Unlock = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockContainer>
    <ClickableEntityTag entity={data.entity}>
      {/* {" "}
      <ClickableStateTag state={data.state} /> */}
    </ClickableEntityTag>
    {isDeletable && (
      <Actions>
        <ActionButton color="error" onClick={onDeleteClick}>
          <Icons.Bin />
        </ActionButton>
      </Actions>
    )}
  </UnlockContainer>
)

const Unlocks = ({ from, to }) => {
  const { edges, nodes, getNodeById } = useEntityGraph()
  const { isUnlockable } = useGameQueries()
  const { getPreviousNodes } = useEntityDependencies()

  const {
    addUnlockToStateTransition,
    removeUnlockFromStateTransition
  } = useGameMutations()

  const unlocks = edges
    .filter(
      edge =>
        edge.type === EDGE_TYPES.UNLOCK &&
        edge.from === from.id &&
        (to ? edge.to === to.id : edge.to.endsWith("-exit"))
    )
    .map(({ unlocks }) => getNodeById(unlocks))

  const [{ isLoading, error }, runAsync] = useAsync()

  if (error) {
    console.error(error)
  }

  const previousNodes = getPreviousNodes(from.id)
  const options = nodes
    .filter(node => isUnlockable(node) && !previousNodes.includes(node.id))
    .filter(
      ({ id, entity }) =>
        entity.states.every(state => state.id !== from.id) &&
        !unlocks.find(unlock => unlock.id === id)
    )
    .map(node => ({ ...node, value: node.id }))

  const onChange = useCallback(
    runAsync(event =>
      Promise.all(
        event.target.value
          .filter(nodeId => unlocks.every(({ id }) => id !== nodeId))
          .map(stateId =>
            addUnlockToStateTransition(from.id, to ? to.id : null, stateId)
          )
      )
    ),
    [unlocks, from, to]
  )

  const removeUnlock = useCallback(
    runAsync(id =>
      removeUnlockFromStateTransition(from.id, to ? to.id : null, id)
    ),
    [from, to]
  )

  return (
    <>
      <Field
        component={DisguisedSelectOptions}
        components={{ Option }}
        render={props => (
          <Label>
            Unlocks
            <Float.Right style={{ marginRight: "-.25rem" }}>
              <ActionButton {...props} color="primary">
                <ToolTip>Add unlock</ToolTip>
                <Icons.Plus />
              </ActionButton>
            </Float.Right>
          </Label>
        )}
        block
        isMulti
        options={options}
        onChange={onChange}
        disabled={isLoading}
        value={unlocks.map(({ id }) => id)}
        error={error}
      />
      {unlocks.length ? (
        unlocks.map(unlock => (
          <Unlock
            key={unlock.id}
            data={unlock}
            onDeleteClick={() => removeUnlock(unlock.id)}
          />
        ))
      ) : (
        <Em>Nothing</Em>
      )}
    </>
  )
}

export default Unlocks
