import React from "react"

import CloseButton from "./CloseButton"

import Meta from "./Meta"
import Fields from "./Fields"
import InformationSlots from "./InformationSlots"
import Entrances from "./Entrances"
import Portals from "./Portals"
import States from "./States"
import Transitions from "./Transitions"

const EditableTemplate = ({ template }) => (
  <>
    <CloseButton />
    <Meta template={template} />
    {!template.isContainer && <Fields template={template} />}
    {!template.isContainer && <InformationSlots template={template} />}
    {template.isContainer && <Entrances template={template} />}
    {template.isPortal && <Portals template={template} />}
    {!template.isContainer && <States template={template} />}
    {!template.isContainer && template.states && (
      <Transitions template={template} />
    )}
  </>
)

export default EditableTemplate
