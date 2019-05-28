import React from "react"

import Section from "components/Section"
import Property from "./Property"

const Properties = ({ entity: { fields } }) =>
  fields.length ? (
    <Section title="Properties" wrapChildren>
      {fields.map(field => (
        <Property key={field.id} field={field} />
      ))}
    </Section>
  ) : null

export default Properties
