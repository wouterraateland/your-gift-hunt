import React from "react"

import Section from "components/Editor/DetailPane/Section"
import Property from "./Property"

const Properties = ({
  node: {
    instance: { fields }
  }
}) =>
  fields.length ? (
    <Section title="Properties">
      {fields.map(field => (
        <Property key={field.id} {...field} />
      ))}
    </Section>
  ) : null

export default Properties
