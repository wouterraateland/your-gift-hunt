import React from "react"
import useScreen from "hooks/useScreen"
import useGame from "hooks/useGame"

const ScreenContainer = () => {
  const { getEntityById } = useGame()
  const { screen, close } = useScreen()
  const Component = screen ? screen.component : null
  const entity = getEntityById(screen.entityId)

  return Component ? <Component entity={entity} close={close} /> : null
}

export default ScreenContainer
