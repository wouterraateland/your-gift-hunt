import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { SafeWithKeyhole } from 'your-gift-hunt/objects'
import SafeWithKeyholeScreen from 'components/screens/SafeWithKeyhole'

const EnhancedSafeWithKeyhole = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <SafeWithKeyhole
      {...props}
      onClick={() => props.state === 'locked' &&
        popup(SafeWithKeyholeScreen, { instanceId: props.id })
      }
    />
  )
}
EnhancedSafeWithKeyhole.entityId = SafeWithKeyhole.entityId

export default EnhancedSafeWithKeyhole
