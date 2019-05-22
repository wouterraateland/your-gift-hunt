import React from "react"

import Section from "components/Editor/DetailPane/Section"
import Slot from "./Slot"

const InformationSlots = ({ entity: { informationSlots }, state }) => {
  const slots = state
    ? state.availableInformationSlots.map(({ id }) =>
        informationSlots.find(slot => slot.id === id)
      )
    : informationSlots

  return slots.length ? (
    <Section title="Information slots" wrapChildren>
      {slots.map(slot => (
        <Slot key={slot.id} slot={slot} />
      ))}
    </Section>
  ) : null
}

export default InformationSlots
