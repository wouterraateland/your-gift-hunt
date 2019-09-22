import React from "react"
import Icons from "ygh-icons"

const EntityTypeIcon = ({
  isPlaceable,
  isItem,
  isTrigger,
  isPortal,
  isContainer,
  ...otherProps
}) => {
  const Icon = isPlaceable
    ? isContainer
      ? Icons.ContainerPlaceable
      : isItem
      ? Icons.Key
      : isPortal
      ? Icons.Door
      : Icons.Cube
    : isContainer
    ? Icons.ContainerNonPlaceable
    : isTrigger
    ? Icons.Trigger
    : Icons.Piece

  return <Icon {...otherProps} />
}

export default EntityTypeIcon
