import React from "react"

import Section from "components/Editor/DetailPane/Section"
import Property from "./Property"

const Properties = ({
  node: {
    instance: { fieldValues }
  }
}) =>
  fieldValues.length ? (
    <Section title="Properties">
      {fieldValues.map(fieldValue => (
        <Property key={fieldValue.id} {...fieldValue} />
      ))}
    </Section>
  ) : null

export default Properties
