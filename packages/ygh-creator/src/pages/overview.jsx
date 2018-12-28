import React from 'react'
import { withFirebase } from 'react-redux-firebase'

import { Wrapper, Paper } from 'your-gift-hunt/ui'
import Nav from 'components/Nav'

const OverviewPage = ({ firebase }) => {
  const hunts = firebase && firebase.data
    ? firebase.data.hunts : []

  return (
    <div>
      <Nav />
      <Wrapper>
        <Paper>
          <h1>Here are all your projects</h1>
          {hunts.length
            ? (
              <ul>
                {hunts.map((hunt, i) =>
                  <li key={i}>{JSON.stringify(hunt)}</li>
                )}
              </ul>
            )
            : <p>Looks like you don't have any projects jet</p>}
        </Paper>
      </Wrapper>
    </div>
  )
}

export default withFirebase(OverviewPage)
