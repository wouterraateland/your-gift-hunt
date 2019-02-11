import React from "react"
import _ from "utils"

import DetailPaneBackground from "components/DetailPane"

const DetailPane = ({ selectedInstance }) => {
  return (
    <DetailPaneBackground>
      <p>{selectedInstance && selectedInstance.name}</p>
    </DetailPaneBackground>
  )
}

export default DetailPane
