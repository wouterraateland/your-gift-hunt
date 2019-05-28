import React from "react"

import Section from "components/Section"
import Portal from "./Portal"

const Portals = ({ entity, state }) => {
  const portals = state
    ? state.openPortals.map(({ id }) =>
        entity.portals.find(portal => portal.id === id)
      )
    : entity.portals

  return portals.length ? (
    <Section title="Portals" wrapChildren>
      {portals.map(portal => (
        <Portal key={portal.id} portal={portal} />
      ))}
    </Section>
  ) : null
}

export default Portals
