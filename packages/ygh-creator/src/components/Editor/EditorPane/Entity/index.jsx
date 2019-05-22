import React, { memo, useMemo } from "react"

import useEntityAreas from "hooks/useEntityAreas"
import useDragOnGrid from "hooks/useDragOnGrid"

import Area from "./Area"
import Container from "./Container"
import NonContainer from "./NonContainer"

const Entity = ({ entity }) => {
  const dragProps = useDragOnGrid(entity)

  const { getEntityArea } = useEntityAreas()
  const area = getEntityArea(entity.id, false)

  const Component = useMemo(
    () => (entity.isContainer ? memo(Container) : memo(NonContainer)),
    [entity.isContainer]
  )

  return (
    <Area {...area} {...dragProps}>
      <Component entity={entity} />
    </Area>
  )
}

export default Entity
