import React, { useContext } from 'react'

import StoreContext from 'contexts/store'

import Align from 'components/ui/Align'
import Overlay from 'components/ui/Overlay'

import Question from 'components/overlays/challenges/Question'
import Code from 'components/overlays/challenges/Code'

const getChallengeComponent = type => {
  switch (type) {
    case 'question': return Question
    case 'code': return Code
    default: return null
  }
}

export default () => {
  const { read, write } = useContext(StoreContext)
  const selectedPieceId = read('selectedPieceId', null)
  const pieces = read('pieces', [])
  const piece = pieces
    .find(piece => piece.id === selectedPieceId)

  const ChallengeComponent = piece && piece.challenge && !piece.challenge.completed
    ? getChallengeComponent(piece.challenge.type)
    : null

  function handleOnCloseClick() {
    write('selectedPieceId', null)
  }

  return (
    <Overlay
      visible={ChallengeComponent !== null}
    >
      <Overlay.Inner>
        <Align.Center>
          <span onClick={handleOnCloseClick}>Sluit</span>
        </Align.Center>
        <br />
        {ChallengeComponent !== null &&
          <ChallengeComponent
            pieceId={piece.id}
            {...piece.challenge}
          />
        }
      </Overlay.Inner>
    </Overlay>
  )
}
