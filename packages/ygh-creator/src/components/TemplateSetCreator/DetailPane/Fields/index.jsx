import React from "react"

import TabbedSection from "components/TabbedSection"
import Field from "./Field"
import Add from "./Add"

const Fields = ({ template }) => (
  <TabbedSection
    title="Fields"
    placeholder="This template has no fields yet."
    tabs={[
      ...template.fields.map(field => ({
        id: field.id,
        label: field.name || <em>Nameless</em>,
        content: <Field template={template} field={field} />
      })),
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default Fields
