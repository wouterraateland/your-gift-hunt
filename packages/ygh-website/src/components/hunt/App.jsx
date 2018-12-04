import React, { useEffect, useContext } from 'react'

import fetchLambda from 'utils/api'

import StoreContext from 'contexts/Store'

import Playground from 'components/Playground'

import IntroductionOverlay from 'components/overlays/Introduction'
import ChallengesOverlay from 'components/overlays/Challenges'
import BoardsOverlay from 'components/overlays/Boards'
import CameraOverlay from 'components/overlays/Camera'

const App = () => {
  const { state, read, write } = useContext(StoreContext)

  useEffect(async () => {
    const boards = await fetchLambda('boards', {
      method: 'GET',
    })
    write('boards', boards)
  }, [])

  useEffect(async () => {
    const pieces = await fetchLambda('pieces', {
      method: 'POST',
      body: {
        responses: read('responses'),
        codes: read('codes')
      }
    })

    write('pieces', pieces)
  }, [state.responses, state.codes])

  return (
    <>
      <Playground />
      {read('started') === undefined && <IntroductionOverlay />}
      <ChallengesOverlay />
      <BoardsOverlay />
      <CameraOverlay />
    </>
  )
}

export default App
