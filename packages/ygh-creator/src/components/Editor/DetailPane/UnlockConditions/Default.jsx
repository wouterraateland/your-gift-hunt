import { NODE_TYPES } from "data"
import React from "react"

import UnlockCondition from "./UnlockCondition"

const DefaultUnlockConditions = () => (
  <UnlockCondition
    data={{ from: { type: NODE_TYPES.ENTRY } }}
    isDeletable={false}
  />
)

export default DefaultUnlockConditions
