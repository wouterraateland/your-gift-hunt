import React from "react"
import useGame from "hooks/useGame"

import { GenericEntity } from "components/entities"
import { Item as ItemScreen } from "your-gift-hunt/entityDetails"

export default ({ entityId, ...props }) => {
  const { getEntityById } = useGame()
  const entity = getEntityById(entityId)

  return (
    <ItemScreen
      entity={entity}
      component={() => <GenericEntity {...entity} />}
      {...props}
    />
  )
}
