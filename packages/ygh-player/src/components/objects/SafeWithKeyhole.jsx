import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { SafeWithKeyhole } from 'your-gift-hunt/objects'
import SafeWithKeyholeScreen from 'components/screens/SafeWithKeyhole'

const EnhancedSafeWithKeyhole = ({ entity, ...props }) => {
  const { popup } = useContext(ScreenContext)

  return (
    <SafeWithKeyhole
      {...props}
      onClick={() => {
        entity && entity.state === 'locked' && popup(SafeWithKeyholeScreen, { entity })
      }}
    />
  )
}
EnhancedSafeWithKeyhole.entityId = SafeWithKeyhole.entityId

export default EnhancedSafeWithKeyhole
