import React, { forwardRef } from "react"

import { Align, Paper, Wrapper } from "ygh-ui"
import CTA from "components/CTA"

const SubscribeModal = forwardRef((_, ref) => (
  <Wrapper.Medium>
    <Paper ref={ref}>
      <Paper.Section>
        <Align.Center>
          <h1>Enjoyed the demo?</h1>
          <p>
            Sign up for the Beta and be the first to make your own escape room
            games.
          </p>
          <CTA />
        </Align.Center>
      </Paper.Section>
    </Paper>
  </Wrapper.Medium>
))

export default SubscribeModal
