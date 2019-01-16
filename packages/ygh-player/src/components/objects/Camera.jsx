import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { Camera } from 'your-gift-hunt/objects'
import CameraScreen from 'components/screens/Camera'

const EnhancedCamera = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <Camera
      {...props}
      onClick={() => popup(CameraScreen, {})}
    />
  )
}
EnhancedCamera.entityId = Camera.entityId

export default EnhancedCamera
