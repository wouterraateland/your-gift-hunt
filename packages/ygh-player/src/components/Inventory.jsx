import React, { useContext } from "react"
import styled from "styled-components"

import ScreenContext from "contexts/Screen"
import GameContext from "contexts/Game"

import { GenericEntity } from "components/entities"
import ItemScreen from "components/screens/Item"

import DragContainer from "components/DragContainer"

const InventoryContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4;

  height: 7em;
  padding: 0.5em;

  white-space: nowrap;

  background: #0009;
`

const ItemSlot = styled.div`
  display: inline-block;
  width: 3em;
  height: 3em;
  padding: 1.5em;
  margin: 0 0.25em;
  border-radius: 1em;
  font-size: 1.5em;

  background: #0009;
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
