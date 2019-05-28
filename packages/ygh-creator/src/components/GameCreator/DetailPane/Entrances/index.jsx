import React from "react"

import Section from "components/Section"
import Entrance from "./Entrance"

const Entrances = ({ entity: { entrances } }) =>
  entrances.length ? (
    <Section title="Entrances" wrapChildren>
      {entrances.map(entrance => (
        <Entrance key={entrance.id} entrance={entrance} />
      ))}
    </Section>
  ) : null

export default Entrances
