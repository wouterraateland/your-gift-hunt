import React from "react"
import styled from "styled-components"

import useScreen from "hooks/useScreen"
import useGame from "hooks/useGame"

import { getEntityComponent, DefaultEntity } from "components/Entities"
import Screens from "components/screens"

import DragContainer from "components/DragContainer"
import EntityContainer from "components/EntityContainer"

const InventoryContainer = styled.div`
  overflow: auto;

  display: flex;

  &::before,
  &::after {
    content: "";

    display: block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  @media (orientation: portrait) {
    mask: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
    margin: 0 -1em;
  }

  @media (orientation: landscape) {
    flex-direction: column;
    mask: linear-gradient(transparent, #fff 10%, #fff 90%, transparent);
    margin: -1em 0;
  }
`

const ItemSlot = styled.div`
  flex-shrink: 0;
  position: relative;
  padding: 2em;
  margin: 0.5em;
  border-radius: ${props => props.theme.borderRadius};

  box-shadow: inset 0.25em 0.25em 0.5em -0.25em #0004,
    inset -0.25em -0.25em 0.5em -0.25em #fff2, 0 0 0.25em #fff2,
    inset -0.1em -0.1em 0.1em -0.1em #fff9;

  background-color: #0004;
`

const StyledEntityContainer = styled(EntityContainer)`
  position: absolute;
  transform: translate(-50%, -50%);
`

const Inventory = () => {
  const { entities, isInInventory } = useGame()
  const { popup } = useScreen()

  const inventoryItems = entities.filter(({ id }) => isInInventory(id))

  return (
    <InventoryContainer>
      {inventoryItems.map(entity => {
        const Component =
          getEntityComponent(entity.template.name) || DefaultEntity
        return (
          <ItemSlot
            key={entity.id}
            onClick={() => popup(Screens.InventoryItem, entity.id)}
          >
            <DragContainer data={entity}>
              <StyledEntityContainer
                maxWidth={3}
                maxHeight={3}
                component={Component}
              >
                <Component {...entity} />
              </StyledEntityContainer>
            </DragContainer>
          </ItemSlot>
        )
      })}
      {Array(Math.max(0, 5 - inventoryItems.length))
        .fill()
        .map((_, i) => (
          <ItemSlot key={i} />
        ))}
    </InventoryContainer>
  )
}

export default Inventory
