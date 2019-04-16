import React, { forwardRef } from "react"

import Worktop from "./Worktop"
import Sink from "./Sink"

const WorktopWithSink = forwardRef(({ children, state, ...props }, ref) => (
  <Worktop {...props}>
    <Sink state={state} ref={ref} left="40%" top={3.25} height={4.5} />
    {children}
  </Worktop>
))
WorktopWithSink.name = "WorktopWithSink"
WorktopWithSink.templateName = "Sink"
WorktopWithSink.defaultProps = Worktop.defaultProps

export default WorktopWithSink
