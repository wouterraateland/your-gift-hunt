import React from "react"

import TabbedSection from "components/TabbedSection"
import Portal from "./Portal"
import Add from "./Add"

const Portals = ({ template }) => (
  <TabbedSection
    title="Portals"
    placeholder="This template has no portals yet."
    tabs={[
      ...template.portals.map(portal => ({
        id: portal.id,
        label: portal.name || <em>Nameless</em>,
        content: <Portal template={template} portal={portal} />
      })),
      {
        label: <Add template={template} />
      }
    ]}
  />
)

export default Portals
