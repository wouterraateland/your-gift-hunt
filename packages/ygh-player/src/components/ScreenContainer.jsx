import React from "react"
import useScreen from "hooks/useScreen"
import useGame from "hooks/useGame"

const ScreenContainer = () => {
  const { getEntityById } = useGame()
  const { screen, close } = useScreen()
  const Component = screen ? screen.component : null
  const entity = getEntityById(screen.entityId)
  const { left, top, rotation, width, height, z, ...strippedEntity } =
    entity || {}

  return Component ? <Component entity={strippedEntity} close={close} /> : null
}

export default ScreenContainer
