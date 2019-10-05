import React, { forwardRef } from "react"

import { Align, Button, Paper, Wrapper } from "ygh-ui"

const SubscribeModal = forwardRef((_, ref) => (
  <Wrapper.Small>
    <Paper ref={ref}>
      <Paper.Section>
        <Align.Center>
          <h1 style={{ marginTop: 0 }}>Enjoyed the game?</h1>
          <Button
            color="secondary"
            importance="primary"
            size="large"
            as="a"
            href="/showcase"
          >
            Play more games
          </Button>
          <p>or</p>
          <Button
            color="primary"
            importance="primary"
            size="large"
            as="a"
            href="/new-game"
          >
            Create your own escape room game
          </Button>
        </Align.Center>
      </Paper.Section>
    </Paper>
  </Wrapper.Small>
))

export default SubscribeModal
