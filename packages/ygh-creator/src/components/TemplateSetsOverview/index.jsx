import React from "react"
import TemplateSet from "./TemplateSet"
import EmptyTemplateSetsOverview from "./Empty"

const TemplateSetsOverview = ({ templateSets }) =>
  templateSets.length ? (
    templateSets.map(templateSet => (
      <TemplateSet key={templateSet.id} templateSet={templateSet} />
    ))
  ) : (
    <EmptyTemplateSetsOverview />
  )

export default TemplateSetsOverview
