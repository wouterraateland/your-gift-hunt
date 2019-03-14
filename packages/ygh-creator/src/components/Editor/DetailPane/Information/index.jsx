import React from "react"

import Section from "components/Editor/DetailPane/Section"
import Slot from "./Slot"

const Properties = ({
  node: {
    state: { state },
    instance: {
      informationWhereAgent,
      entity: { informationSlots }
    }
  }
}) => {
  const availableInformationSlots = informationSlots
    .filter(({ entityStates }) =>
      entityStates.some(({ id }) => id === state.id)
    )
    .map(slot => ({
      ...slot,
      information: informationWhereAgent.find(
        information => information.slot.id === slot.id
      )
    }))

  return availableInformationSlots.length ? (
    <Section title="Information slots">
      {availableInformationSlots.map(informationSlot => (
        <Slot key={informationSlot.id} {...informationSlot} />
      ))}
    </Section>
  ) : null
}

export default Properties
