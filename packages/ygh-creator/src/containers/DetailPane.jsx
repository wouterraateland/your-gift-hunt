import React, { forwardRef } from "react"

import DetailPaneContainer from "components/DetailPane/Container"
import InstancePreview from "components/DetailPane/InstancePreview"
import DetailPaneBody from "components/DetailPane/Body"

const DetailPane = forwardRef(({ open, selectedInstance }, ref) => {
  return (
    <DetailPaneContainer open={open} ref={ref}>
      {!!selectedInstance && (
        <>
          <InstancePreview instance={selectedInstance} />
          <DetailPaneBody instance={selectedInstance} />
        </>
      )}
    </DetailPaneContainer>
  )
})

export default DetailPane
