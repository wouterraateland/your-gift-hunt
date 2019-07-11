import React from "react"
import * as Icon from "ygh-icons"

const EntityTypeIcon = ({
  isItem,
  isObject,
  isTrigger,
  isContainer,
  ...otherProps
}) =>
  isContainer ? (
    <Icon.Container {...otherProps} />
  ) : isItem ? (
    <Icon.Item {...otherProps} />
  ) : isObject ? (
    <Icon.Object {...otherProps} />
  ) : isTrigger ? (
    <Icon.Trigger {...otherProps} />
  ) : (
    <Icon.Challenge {...otherProps} />
  )

export default EntityTypeIcon
