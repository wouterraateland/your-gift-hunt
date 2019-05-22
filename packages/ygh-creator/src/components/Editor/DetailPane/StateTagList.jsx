import React, { Fragment } from "react"
import styled from "styled-components"

import StateTag from "components/Editor/StateTag"

const Em = styled.em`
  opacity: 0.5;
`

const StateTagList = ({ states, connector }) =>
  states.length ? (
    states.map((state, i) => (
      <Fragment key={i}>
        {i !== 0 && connector}
        <StateTag state={state} />
      </Fragment>
    ))
  ) : (
    <Em>None</Em>
  )

export default StateTagList
