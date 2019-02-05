import React from "react"

import Scene from "components/Scene"
import * as Object from "components/objects"

const DefaultScene = ({ objects, items }) => {
  function withName(name) {
    return objects.find(o => o.entity.name === name)
  }

  return (
    <Scene left={-2} top={-1.8} width={33} height={46}>
      <Object.Grass left={-40} top={-20} instance={withName("Grass")} />

      <Object.Floor angle={-5} instance={withName("Floor")}>
        <Object.Path left={8.5} top={36} instance={withName("Path")} />
        {items.map((item, i) => (
          <Object.Package
            key={item.id}
            left={10.5 + 0.5 * i}
            top={38.5 + 5 * i}
            angle={-10 + 15 * i}
            instance={item}
          />
        ))}
        <Object.Mailbox left={6.5} top={38.5} instance={withName("Mailbox")} />

        <Object.Carpet
          left={16.5}
          top={17.5}
          angle={-5}
          instance={withName("Carpet")}
        />

        <Object.Armchair
          left={20.5}
          top={27.5}
          angle={-45}
          instance={withName("Armchair")}
        />
        <Object.Camera
          left={17.5}
          top={23.5}
          angle={40}
          instance={withName("Camera")}
        />
        <Object.Lamp
          left={25.5}
          top={24.5}
          angle={160}
          instance={withName("Lamp")}
        />

        <Object.PlantPot
          left={1.5}
          top={12.5}
          instance={withName("Plant pot")}
        />
        <Object.Sink
          left={-4.25}
          top={23}
          angle={90}
          instance={withName("Sink")}
        />

        <Object.SafeWithKeyhole
          left={21.5}
          top={2.5}
          angle={30}
          instance={withName("Safe with keyhole")}
        />

        <Object.DeskChair
          left={7}
          top={6.5}
          angle={10}
          instance={withName("Desk chair")}
        />
        <Object.Desk left={5.5} top={-2} angle={90} instance={withName("Desk")}>
          <Object.Computer
            left={1}
            top={1}
            angle={-80}
            instance={withName("Computer")}
          />
          <Object.InstructionNote
            left={2}
            top={7}
            angle={-70}
            instance={withName("InstructionNote")}
          />
        </Object.Desk>

        <Object.Door left={9.5} top={34.5} instance={withName("Door")} />
        <Object.Wall left={-0.5} top={-0.5} instance={withName("Wall")} />
      </Object.Floor>
    </Scene>
  )
}

export default DefaultScene
