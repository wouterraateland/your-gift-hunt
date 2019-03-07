import React from "react"

import * as Icon from "your-gift-hunt/icons"

import TypesContainer from "./TypesContainer"
import TypeEntry from "./TypeEntry"

const types = [
  { name: "challenge", icon: Icon.Challenge },
  { name: "object", icon: Icon.Object },
  { name: "trigger", icon: Icon.Trigger }
]

const Types = ({ onTypeClick, selectedType }) => (
  <TypesContainer typeSelected={!!selectedType}>
    {types.map(({ name, icon }) => (
      <TypeEntry
        key={name}
        isSelected={selectedType === name}
        icon={icon}
        label={`Add ${name}`}
        onClick={() => onTypeClick(name)}
      />
    ))}
  </TypesContainer>
)

export default Types
