import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"

import useInspector from "hooks/useInspector"
import useEditor from "hooks/useEditor"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameMutations from "hooks/useGameMutations"

import useClickOutside from "hooks/useClickOutside"

import { Button } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"

const Container = styled.div`
  margin-top: 1em;
`

const Info = styled.small`
  display: inline-block;
  margin-top: 0.5em;

  opacity: 0.5;

  &::before {
    content: "i";

    display: inline-block;
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
    border-radius: 100%;

    text-align: center;
    font-style: italic;

    background: #0002;
  }
`

const DeleteButton = ({ entity, state }) => {
  const ref = useRef(null)
  const { isOpen, closeInspector } = useInspector()
  const { ACTION_TYPES, upcomingAction, setUpcomingAction } = useEditor()
  const { getDependentNodes } = useEntityDependencies()
  const { deleteNodes } = useGameMutations()

  useClickOutside({ ref, onClickOutside: () => setUpcomingAction(null) })

  useEffect(() => {
    return () => {
      setUpcomingAction(null)
    }
  }, [entity, state, isOpen])

  const isDeleting =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    (upcomingAction.payload.entityId === entity.id ||
      (state && upcomingAction.payload.stateId === state.id))

  const onClick = useCallback(async () => {
    if (isDeleting) {
      closeInspector()
      await deleteNodes(upcomingAction.payload.dependentStates)
    } else {
      setUpcomingAction({
        type: ACTION_TYPES.DELETE_NODE,
        payload: {
          entityId: entity.id,
          stateId: state ? state.id : null,
          dependentStates: getDependentNodes(
            state ? [state.id] : entity.states.map(({ id }) => id)
          )
        }
      })
    }
  }, [isDeleting, entity, state])

  return (
    <Container>
      <Button
        ref={ref}
        block
        onClick={onClick}
        color="error"
        importance="primary"
      >
        <Bin />{" "}
        {isDeleting
          ? `Confirm deletion`
          : state
          ? "Delete state"
          : "Delete entity"}
      </Button>
      <Info>
        Deleting this node also deletes all nodes that are dependent on it.
      </Info>
    </Container>
  )
}

export default DeleteButton
