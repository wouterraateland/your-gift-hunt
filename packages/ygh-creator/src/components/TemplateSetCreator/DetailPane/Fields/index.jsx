import React from "react"

import TabbedSection from "components/TabbedSection"
import FieldGroup from "./FieldGroup"
import Add from "./Add"

const Fields = ({ template }) => (
  <TabbedSection
    title="Fields"
    placeholder="This template has no fields yet."
    tabs={template.fields.map(field => ({
      id: field.id,
      label: field.name || <em>Nameless</em>,
      content: <FieldGroup template={template} field={field} />
    }))}
    actions={[
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default Fields
