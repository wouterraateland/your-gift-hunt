import React from "react"
import useScreen from "hooks/useScreen"

const ScreenContainer = () => {
  const { screen, close } = useScreen()
  const Component = screen ? screen.component : null

  return Component ? (
    <Component {...screen.props} isVisible close={close} />
  ) : null
}

export default ScreenContainer
