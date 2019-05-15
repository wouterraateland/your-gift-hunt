import React, { memo } from "react"
import { GenericEntity } from "components/Entities"

import useGame from "hooks/useGame"

const withPackageBehaviour = WrappedComponent => {
  const EnhancedComponent = memo(props => {
    const { entities } = useGame()

    const containedEntities = entities.filter(
      ({ container }) =>
        container &&
        props.portals.some(portal => container.id === portal.entrance.entity.id)
    )

    return (
      <WrappedComponent {...props}>
        {containedEntities.map(containedEntity => (
          <GenericEntity key={containedEntity.id} {...containedEntity} />
        ))}
      </WrappedComponent>
    )
  })
  EnhancedComponent.name = WrappedComponent.name
  EnhancedComponent.templateName = WrappedComponent.templateName
  EnhancedComponent.defaultProps = WrappedComponent.defaultProps

  return EnhancedComponent
}

export default withPackageBehaviour

// import { getEntityComponent } from "./"
// const ItemContainer = styled.div`
//   position: absolute;
//   z-index: 0;
//
//   transform: scale(${props => props.scale});
//
//   ${({ i, n }) => {
//     switch (n) {
//       case 1:
//         return css`
//           left: 50%;
//           top: 50%;
//         `
//       case 2:
//         return css`
//           left: ${i === 0 ? 30 : 70}%;
//           top: ${i === 0 ? 30 : 70}%;
//         `
//       case 3:
//         return css`
//           left: ${i === 0 ? 50 : i === 1 ? 25 : 75}%;
//           top: ${25 + (i > 0) ? 50 : 0}%;
//         `
//       default:
//         return css`
//           left: ${25 + (i % 2) * 50}%;
//           top: ${25 + (i > 1) ? 50 : 0}%;
//         `
//     }
//   }}
// `
//
// const itemContainer =
// const Components = itemContainer
//   ?containedEntities.map(containedEntity =>
//   getEntityComponent(containedEntity.template.name)
// ) : []
// const maxSize =
//   Components.length === 1 ? 2 : Components.length === 2 ? 1.75 : 1
