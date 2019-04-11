import React, { useCallback, useContext, useMemo } from "react"

import GameContext from "contexts/Game"

import Scene from "components/Scene"
import Entities from "components/entities"

const DefaultScene = () => {
  const { entities, isInInventory } = useContext(GameContext)
  const withTemplate = useCallback(
    name => entities.find(e => e.template.name === name),
    [entities]
  )
  const packagedItems = useMemo(
    () => entities.filter(entity => entity.isItem && !isInInventory(entity)),
    [entities, isInInventory]
  )

  const safeWithCodeExists = entities.some(
    ({ template }) => template && template.name === "Safe with code"
  )

  return (
    <Scene left={-20} top={-40} width={40} height={80}>
      <Entities.Grass
        {...withTemplate("Grass")}
        left={0}
        top={0}
        width={100}
        height={80}
      />

      <Entities.Floor {...withTemplate("Floor")} left={0} top={0} rotation={-5}>
        <Entities.Path {...withTemplate("Path")} left={12} top={44} />
        {packagedItems.map((item, i) => (
          <Entities.Package
            key={item.id}
            left={12 + 0.5 * i}
            top={40 + 5 * i}
            rotation={-10 + 15 * i}
            {...item}
          />
        ))}
        <Entities.Mailbox {...withTemplate("Mailbox")} left={6.5} top={38.5} />

        <Entities.Carpet
          {...withTemplate("Carpet")}
          left={21.5}
          top={22.5}
          rotation={-5}
        />

        <Entities.Armchair
          {...withTemplate("Armchair")}
          left={23.5}
          top={29.5}
          rotation={-45}
        />
        <Entities.Camera
          {...withTemplate("Camera")}
          left={17.5}
          top={23.5}
          rotation={40}
        />
        <Entities.Lamp
          {...withTemplate("Lamp")}
          left={26.5}
          top={25.5}
          rotation={160}
        />

        <Entities.PlantPot
          {...withTemplate("Plant pot")}
          left={3.5}
          top={12.5}
        />
        <Entities.Sink
          {...withTemplate("Sink")}
          left={3.25}
          top={24}
          rotation={90}
        />

        {safeWithCodeExists ? (
          <Entities.SafeWithCode
            {...withTemplate("Safe with code")}
            left={23.5}
            top={4.5}
            rotation={30}
          />
        ) : (
          <Entities.SafeWithKeyhole
            {...withTemplate("Safe with keyhole")}
            left={23.5}
            top={4.5}
            rotation={30}
          />
        )}

        <Entities.DeskChair
          {...withTemplate("Desk chair")}
          left={7}
          top={6.5}
          rotation={10}
        />
        <Entities.Desk
          {...withTemplate("Desk")}
          left={7.5}
          top={4}
          rotation={90}
        >
          <Entities.Computer
            {...withTemplate("Computer")}
            left={3}
            top={3}
            rotation={-80}
          />
          <Entities.InstructionNote
            {...withTemplate("Instruction note")}
            left={3}
            top={9}
            rotation={-70}
          />
        </Entities.Desk>

        <Entities.Door {...withTemplate("Door")} left={12} top={35} />
        <Entities.Wall {...withTemplate("Wall")} />
      </Entities.Floor>
    </Scene>
  )
}

export default DefaultScene
