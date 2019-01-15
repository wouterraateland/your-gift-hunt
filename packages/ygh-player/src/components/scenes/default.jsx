import React from 'react'

import Scene from 'components/Scene'
import * as Object from 'components/objects'

const DefaultScene = () => {

  return (
    <Scene
      left={-2} top={-1.8}
      width={33} height={46}
    >
      <Object.Grass left={-40} top={-20} />

      <Object.Floor angle={-5}>
        <Object.Path left={8.5} top={36} />
        <Object.Mailbox left={6.5} top={38.5} />

        <Object.Carpet left={16.5} top={17.5} angle={-5} />

        <Object.Armchair left={20.5} top={27.5} angle={-45} />
        <Object.Camera left={17.5} top={23.5} angle={40} />
        <Object.Lamp left={25.5} top={24.5} angle={160} />

        <Object.PlantPot left={1.5} top={12.5} />
        <Object.Sink left={-4.25} top={23} angle={90} />

        <Object.SafeWithKeyhole left={21.5} top={2.5} angle={30} />

        <Object.DeskChair left={7} top={6.5} angle={10} />
        <Object.Desk left={5.5} top={-2} angle={90}>
          <Object.Computer left={1} top={1} angle={-80} />
          <Object.InstructionNote left={2} top={7} angle={-70} />
        </Object.Desk>

        <Object.Door left={9.5} top={34.5} />
        <Object.Wall left={-.5} top={-.5} />
      </Object.Floor>
    </Scene>
  )
}

export default DefaultScene
