import React from "react"
import Icons from "ygh-icons"

const EntityTypeIcon = ({
  isItem,
  isObject,
  isTrigger,
  isContainer,
  ...otherProps
}) =>
  isContainer ? (
    <Icons.Container {...otherProps} />
  ) : isItem ? (
    <Icons.Key {...otherProps} />
  ) : isObject ? (
    <Icons.Cube {...otherProps} />
  ) : isTrigger ? (
    <Icons.Trigger {...otherProps} />
  ) : (
    <Icons.Piece {...otherProps} />
  )

export default EntityTypeIcon
