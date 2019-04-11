import React, { useContext } from "react"
import GameContext from "contexts/Game"

import { GenericEntity } from "components/entities"
import { Item as ItemScreen } from "your-gift-hunt/screens"

export default ({ entityId, ...props }) => {
  const { getEntityById } = useContext(GameContext)
  const entity = getEntityById(entityId)

  return (
    <ItemScreen
      entity={entity}
      component={() => <GenericEntity {...entity} />}
      {...props}
    />
  )
}
