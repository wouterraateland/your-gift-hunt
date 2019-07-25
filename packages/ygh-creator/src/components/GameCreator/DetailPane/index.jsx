import React, { useEffect, useRef } from "react"

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

import Container from "./Container"
import Header from "./Header"
import Body from "./Body"

const DetailPane = () => {
  const ref = useRef(null)
  const { inspectedEntity, inspectedState } = useInspector()
  const { getEntityById, getStateById } = useGameQueries()

  const entity = getEntityById(inspectedEntity)
  const state = getStateById(inspectedState)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0)
    }
  }, [inspectedEntity, inspectedState])

  return (
    <Container hasPreview={!!entity && (entity.isObject || entity.isItem)}>
      <Header />
      <Body ref={ref}>
        {entity && <Preview entity={entity} state={state} />}
        {entity && <Meta entity={entity} state={state} />}
        {state && <PreviousStates state={state} />}
        {state && <UnlockConditions entity={entity} state={state} />}
        {state && <Transitions state={state} />}
        {entity && <Properties entity={entity} />}
        {entity && <InformationSlots entity={entity} state={state} />}
        {entity && <Portals entity={entity} state={state} />}
        {entity && <Entrances entity={entity} />}
        {entity && !state && <States entity={entity} />}
        {entity && <Delete entity={entity} state={state} />}
      </Body>
    </Container>
  )
}

export default DetailPane
