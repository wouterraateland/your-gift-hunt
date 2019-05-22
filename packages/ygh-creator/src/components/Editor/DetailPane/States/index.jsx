import React from "react"

import Section from "components/Editor/DetailPane/Section"

import StateTagList from "components/Editor/DetailPane/StateTagList"

const States = ({ entity }) =>
  entity.isContainer ? null : (
    <Section title="States">
      <StateTagList states={entity.states} connector={" "} />
    </Section>
  )

export default States
