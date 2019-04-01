import React from "react"

import Section from "components/Editor/DetailPane/Section"
import Slot from "./Slot"

const InformationSlots = ({
  node: {
    state: { availableInformationSlots },
    entity: { informationSlots }
  }
}) =>
  availableInformationSlots.length ? (
    <Section title="Information slots">
      {availableInformationSlots.map(({ id }) => (
        <Slot key={id} slot={informationSlots.find(slot => slot.id === id)} />
      ))}
    </Section>
  ) : null

export default InformationSlots
