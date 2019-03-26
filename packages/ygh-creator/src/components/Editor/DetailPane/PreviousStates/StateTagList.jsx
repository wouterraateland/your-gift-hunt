import React, { Fragment } from "react"
import styled from "styled-components"

import NodeTag from "components/Editor/NodeTag"

const Em = styled.em`
  opacity: 0.5;
`

const StateTagList = ({ nodes, connector }) =>
  nodes.length ? (
    nodes.map((node, i) => (
      <Fragment key={i}>
        {i !== 0 && connector}
        <NodeTag node={node} />
      </Fragment>
    ))
  ) : (
    <Em>None</Em>
  )

export default StateTagList
