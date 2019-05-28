import React from "react"

import useInspector from "hooks/useInspector"

import Transition from "components/Primitives/Transition"

const ClickableTransition = props => {
  const { inspectState } = useInspector()

  return (
    <Transition {...props} onStateClick={stateId => inspectState(stateId)} />
  )
}

export default ClickableTransition
