import React, { useContext } from "react"
import styled from "styled-components"

import ScreenContext from "contexts/Screen"
import GameContext from "contexts/Game"

import { GenericEntity } from "components/entities"
import ItemScreen from "components/screens/Item"

import DragContainer from "components/DragContainer"

const InventoryContainer = styled.div`
  overflow: auto;

  display: flex;

  @media (orientation: portrait) {
    mask: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
  }

  @media (orientation: landscape) {
    flex-direction: column;
    mask: linear-gradient(transparent, #fff 10%, #fff 90%, transparent);
  }
`

const ItemSlot = styled.div`
  flex-shrink: 0;
  padding: 2em;
  margin: 0.5em;
  border-radius: 100%;

  background: #fff4;

  & > * {
    font-size: 1.5em;
  }
`

const Inventory = () => {
  const { entities, isInInventory } = useContext(GameContext)
  const { popup } = useContext(ScreenContext)

  const inventoryItems = entities.filter(isInInventory)

  return (
    <InventoryContainer>
      {inventoryItems.map(entity => (
        <ItemSlot
          key={entity.id}
          onClick={() => popup(ItemScreen, { entityId: entity.id })}
        >
          <DragContainer data={entity}>
            <GenericEntity {...entity} />
          </DragContainer>
        </ItemSlot>
      ))}
    </InventoryContainer>
  )
}

export default Inventory
