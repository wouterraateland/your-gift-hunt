import React from "react"

import useInspector from "hooks/useInspector"

import StateTag from "components/Primitives/StateTag"

const ClickableStateTag = props => {
  const { inspectState } = useInspector()

  return (
    <StateTag
      onClick={() => props.state && inspectState(props.state.id)}
      {...props}
    />
  )
}

export default ClickableStateTag
