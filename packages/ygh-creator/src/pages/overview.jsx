import React from 'react'
import { withFirebase } from 'react-redux-firebase'

import { Wrapper, Paper, Float, Input, Button } from 'your-gift-hunt/ui'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import HuntList from 'components/HuntList'

const OverviewPage = ({ firebase }) => {
  const hunts = firebase && firebase.data
    ? firebase.data.hunts : []

  return (
    <div>
      <Nav />
      <Wrapper>
        <Paper>
          <Paper.Section>
            <Float.Left>
              <Input
                type="search"
              />
            </Float.Left>
            <Float.Right>
              <Button
                importance="primary"
                color="accent"
              >
                New hunt
              </Button>
            </Float.Right>
          </Paper.Section>
          <HuntList hunts={hunts} />
        </Paper>
      </Wrapper>
      <Footer />
    </div>
  )
}

export default withFirebase(OverviewPage)
