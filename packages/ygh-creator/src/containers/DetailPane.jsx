import React, { forwardRef } from "react"
import _ from "utils"

import DetailPaneContainer from "components/DetailPane/Container"
import InstancePreview from "components/DetailPane/InstancePreview"

const DetailPane = forwardRef(({ open, selectedInstance }, ref) => {
  return (
    <DetailPaneContainer open={open} ref={ref}>
      {!!selectedInstance && <InstancePreview instance={selectedInstance} />}
    </DetailPaneContainer>
  )
})

export default DetailPane
