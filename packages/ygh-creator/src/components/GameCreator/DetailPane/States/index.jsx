import React from "react"

import Section from "components/Section"

import StateTagList from "components/GameCreator/DetailPane/StateTagList"

const States = ({ entity }) =>
  entity.isContainer ? null : (
    <Section title="States">
      <StateTagList states={entity.states} connector={" "} />
    </Section>
  )

export default States
