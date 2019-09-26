import React, { forwardRef } from "react"

import Worktop from "./Worktop"
import Sink from "./Sink"

const WorktopWithSink = forwardRef(({ children, state, ...props }, ref) => (
  <Worktop {...props}>
    <Sink
      state={state}
      ref={ref}
      left="40%"
      top={Math.min(props.height / 2, 3) + 0.25}
      height={Math.min(props.height - 1.5, 4.5)}
      width={Math.min(props.width - 2, 6)}
    />
    {children}
  </Worktop>
))
WorktopWithSink.name = "WorktopWithSink"
WorktopWithSink.templateName = "Sink"
WorktopWithSink.defaultProps = {
  ...Worktop.defaultProps,
  Detail: WorktopWithSink
}

export default WorktopWithSink
