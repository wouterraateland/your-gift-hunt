import React from "react"

import useInspector from "hooks/useInspector"

import EntityTag from "components/Primitives/EntityTag"

const ClickableEntityTag = props => {
  const { inspectEntity } = useInspector()

  return (
    <EntityTag
      onClick={() => props.entity && inspectEntity(props.entity.id)}
      {...props}
    />
  )
}

export default ClickableEntityTag
