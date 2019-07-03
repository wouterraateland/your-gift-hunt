import React, { useCallback, useRef, useState } from "react"

import useClickOutside from "hooks/useClickOutside"

import Container from "./Container"
import Types from "./Types"
import Entities from "./Entities"

const Toolbox = () => {
  const ref = useRef(null)

  const [{ selectedType, entitiesVisible }, setState] = useState({
    selectedType: null,
    entitiesVisible: false
  })

  const hideEntities = useCallback(
    () =>
      setState(state => ({
        ...state,
        entitiesVisible: false
      })),
    []
  )

  useClickOutside({
    ref,
    onClickOutside: hideEntities
  })

  const toggleSelectedType = useCallback(
    selectedType =>
      setState(state => ({
        ...state,
        selectedType,
        entitiesVisible:
          state.selectedType === selectedType ? !state.entitiesVisible : true
      })),
    []
  )

  return (
    <Container ref={ref}>
      <Types
        onTypeClick={toggleSelectedType}
        selectedType={entitiesVisible ? selectedType : null}
      />
      <Entities
        isVisible={entitiesVisible}
        selectedType={selectedType}
        onBackClick={hideEntities}
      />
    </Container>
  )
}

export default Toolbox
