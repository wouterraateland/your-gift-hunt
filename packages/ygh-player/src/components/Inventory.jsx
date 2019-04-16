import React from "react"
import styled from "styled-components"

import useScreen from "hooks/useScreen"
import useGame from "hooks/useGame"

import { GenericEntity } from "components/entities"
import Screens from "components/screens"

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
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: inset 0.25em 0.25em 0.5em -0.25em #0004,
    inset -0.25em -0.25em 0.5em -0.25em #fff2, 0 0 0.25em #fff2,
    inset -0.1em -0.1em 0.1em -0.1em #fff9;

  background-color: #0004;

  & > * {
    font-size: 1.5em;
  }
`

const Inventory = () => {
  const { entities, isInInventory } = useGame()
  const { popup } = useScreen()

  const inventoryItems = entities.filter(isInInventory)

  return (
    <InventoryContainer>
      {inventoryItems.map(entity => (
        <ItemSlot
          key={entity.id}
          onClick={() => popup(Screens.InventoryItem, entity.id)}
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
