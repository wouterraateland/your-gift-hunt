import React from "react"

import Icons from "ygh-icons"

import TypesContainer from "./TypesContainer"
import TypeEntry from "./TypeEntry"

const types = [
  { name: "challenge", icon: Icons.Piece },
  { name: "container", icon: Icons.Container },
  { name: "object", icon: Icons.Cube },
  // { name: "item", icon: Icons.Item },
  { name: "trigger", icon: Icons.Trigger }
]

const Types = ({ onTypeClick, selectedType }) => (
  <TypesContainer typeSelected={!!selectedType}>
    {types.map(({ name, icon }) => (
      <TypeEntry
        key={name}
        isSelected={selectedType === name}
        icon={icon}
        label={`Add ${name}`}
        onMouseDown={() => onTypeClick(name)}
      />
    ))}
  </TypesContainer>
)

export default Types
