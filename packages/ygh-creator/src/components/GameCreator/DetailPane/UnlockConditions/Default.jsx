import React from "react"

import UnlockCondition from "./UnlockCondition"

const DefaultUnlockConditions = ({ entity }) => (
  <UnlockCondition entity={entity} isDeletable={false} />
)

export default DefaultUnlockConditions
