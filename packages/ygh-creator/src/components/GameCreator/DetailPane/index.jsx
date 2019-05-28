import React, { forwardRef, useEffect } from "react"

import useGameQueries from "hooks/useGameQueries"
import useInspector from "hooks/useInspector"

import Delete from "./Delete"
import Entrances from "./Entrances"
import InformationSlots from "./InformationSlots"
import Meta from "./Meta"
import Portals from "./Portals"
import Preview from "./Preview"
import PreviousStates from "./PreviousStates"
import Properties from "./Properties"
import States from "./States"
import Transitions from "./Transitions"
import UnlockConditions from "./UnlockConditions"

import Background from "./Background"
import CloseButton from "./CloseButton"

const DetailPane = forwardRef((_, ref) => {
  const { isOpen, inspectedEntity, inspectedState } = useInspector()
  const { getEntityById, getStateById } = useGameQueries()

  const entity = getEntityById(inspectedEntity)
  const state = getStateById(inspectedState)

  useEffect(
    () => {
      if (ref.current) {
        ref.current.scrollTo(0, 0)
      }
    },
    [isOpen, inspectedEntity, inspectedState]
  )

  return (
    <Background
      isOpen={isOpen}
      ref={ref}
      hasPreview={!!entity && (entity.isObject || entity.isItem)}
    >
      {entity && <Preview entity={entity} state={state} />}
      {entity && <Meta entity={entity} state={state} />}
      {entity && <Properties entity={entity} />}
      {entity && <InformationSlots entity={entity} state={state} />}
      {entity && <Portals entity={entity} state={state} />}
      {entity && <Entrances entity={entity} />}
      {entity && !state && <States entity={entity} />}
      {state && <PreviousStates state={state} />}
      {state && <UnlockConditions entity={entity} state={state} />}
      {state && <Transitions state={state} />}
      {entity && <Delete entity={entity} state={state} />}
      <CloseButton />
    </Background>
  )
})

export default DetailPane
