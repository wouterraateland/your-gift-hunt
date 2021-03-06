import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"

import useInspector from "hooks/useInspector"
import useEditor from "hooks/useEditor"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameMutations from "hooks/useGameMutations"

import { useClickOutside } from "ygh-hooks"

import { Button } from "ygh-ui"
import { Bin } from "ygh-icons"

const Container = styled.div`
  margin: 1em;
`

const Info = styled.small`
  display: inline-block;
  margin-top: 0.5em;

  color: ${props => props.theme.color.caption};

  &::before {
    content: "i";

    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5em;
    border-radius: 100%;

    text-align: center;
    font-style: italic;

    background-color: #0002;
  }
`

const DeleteButton = ({ entity, state }) => {
  const ref = useRef(null)
  const { isOpen, closeInspector } = useInspector()
  const { ACTION_TYPES, upcomingAction, setUpcomingAction } = useEditor()
  const { getDependentNodes } = useEntityDependencies()
  const { deleteNodes } = useGameMutations()

  useClickOutside({
    ref,
    onClickOutside:
      upcomingAction && upcomingAction.type === ACTION_TYPES.DELETE_NODE
        ? () => setUpcomingAction(null)
        : () => {}
  })

  useEffect(() => {
    return () => {
      if (
        !isOpen &&
        upcomingAction &&
        upcomingAction.type === ACTION_TYPES.DELETE_NODE
      ) {
        setUpcomingAction(null)
      }
    }
  }, [upcomingAction, entity, state, isOpen])

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
