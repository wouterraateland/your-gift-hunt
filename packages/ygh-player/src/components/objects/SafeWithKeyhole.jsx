import React, { useContext } from "react"
import _ from "utils"

import ScreenContext from "contexts/Screen"

import { SafeWithKeyhole } from "your-gift-hunt/objects"
import SafeWithKeyholeScreen from "components/screens/SafeWithKeyhole"

const EnhancedSafeWithKeyhole = props => {
  const { popup } = useContext(ScreenContext)

  return (
    <SafeWithKeyhole
      {...props}
      onClick={() =>
        _.hasState("locked")(props) &&
        popup(SafeWithKeyholeScreen, { instanceId: props.id })
      }
    />
  )
}
EnhancedSafeWithKeyhole.entityName = SafeWithKeyhole.entityName

export default EnhancedSafeWithKeyhole
