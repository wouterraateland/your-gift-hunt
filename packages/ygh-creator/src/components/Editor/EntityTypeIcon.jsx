import React from "react"
import * as Icon from "your-gift-hunt/icons"

const EntityTypeIcon = ({ isItem, isObject, isTrigger }) => (
  <>
    {isItem && <Icon.Item size={1} />}
    {isObject && <Icon.Object size={1} />}
    {isTrigger && <Icon.Trigger size={1} />}
    {!isItem && !isObject && !isTrigger && <Icon.Challenge size={1} />}
  </>
)

export default EntityTypeIcon
