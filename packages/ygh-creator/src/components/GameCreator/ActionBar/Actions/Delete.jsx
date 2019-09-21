import React, { useCallback, useRef } from "react"

import { useClickOutside } from "ygh-hooks"
import * as Icons from "ygh-icons"

import useEditor from "hooks/useEditor"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameMutations from "hooks/useGameMutations"

import Action from "./Action"

const Delete = ({ entity }) => {
  const ref = useRef(null)
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

  const isDeleting =
    upcomingAction &&
    upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
    upcomingAction.payload.entityId === entity.id

  const onAct = useCallback(async () => {
    if (isDeleting) {
      await deleteNodes(upcomingAction.payload.dependentStates)
    } else {
      setUpcomingAction({
        type: ACTION_TYPES.DELETE_NODE,
        payload: {
          entityId: entity.id,
          stateId: null,
          dependentStates: getDependentNodes(entity.states.map(({ id }) => id))
        }
      })
    }
  }, [isDeleting, entity])

  return (
    <Action
      ref={ref}
      title={isDeleting ? "Confirm deletion" : "Delete entity"}
      color="error"
      icon={Icons.Bin}
      onAct={onAct}
    />
  )
}

export default Delete
