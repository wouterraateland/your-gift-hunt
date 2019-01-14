import React, { useContext } from 'react'

import StoreContext from 'contexts/store'

import Overlay from 'components/ui/Overlay'
import Paper from 'components/ui/Paper'
import Button from 'components/ui/Button'

const Introduction = () => {
  const { write } = useContext(StoreContext)

  function handleOnStartClick() {
    write('started', true)
  }

  return (
    <Overlay visible>
      <Overlay.Inner>
        <Paper>
          <Paper.Section>
            <h1>Lieve Marjo <span role="img" aria-label="Zonnebloem">🌻</span><span role="img" aria-label="Marjo">👩</span></h1>
            <p>Alweer meer dan een week geleden was jij jarig. Op dat moment had ik helaas nog geen tijd gehad / gemaakt om iets moois voor jou voor te bereiden. Ik hoop dat ik dat nu wel heb gedaan. En dat je even kan wachten op wat er komen gaat. Want dit verjaardagsspel speel je niet in een dag... Veel speelplezier <span role="img" aria-label="Kus!">😘</span></p>
          </Paper.Section>
        </Paper>
        <br />
        <Button
          onClick={handleOnStartClick}
          block>Ik ben er klaar voor!</Button>
      </Overlay.Inner>
    </Overlay>
  )
}

export default Introduction
