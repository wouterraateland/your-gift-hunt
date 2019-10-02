import gql from "graphql-tag"

export const INFORMATION_SLOT_TEMPLATE_FRAGMENT = gql`
  fragment InformationSlotTemplateFragment on InformationSlotTemplate {
    id

    name
    description

    allowedTypes {
      id
      type
      isMulti
    }
    states {
      id
    }
  }
`

export const ENTITY_TEMPLATE_FRAGMENT = gql`
  fragment EntityTemplateFragment on EntityTemplate {
    id
    name
    description

    isItem
    isObject
    isTrigger
    isGame
    isContainer
    isPortal
    isPlaceable

    fields {
      id
      name
      description

      type {
        id
        type
        isMulti
      }
      isSecret
    }
    featuredField {
      id
    }

    set {
      id
    }

    informationSlots {
      ...InformationSlotTemplateFragment
    }

    entrances {
      id

      name
      description

      connectablePortals {
        id
      }
    }

    portals {
      id

      name
      description

      states {
        id
      }

      connectableEntrances {
        id
      }
    }

    states {
      id

      name
      description

      openPortals {
        id
      }
      availableInformationSlots {
        id
      }
      incomingTransitions {
        id
        from {
          id
        }
      }
      outgoingTransitions {
        id

        from {
          id
        }
        to {
          id
        }

        requiredActions {
          id

          name
          description

          type
          hints {
            id
            text
            delay
          }

          payload {
            id
            requiredEntity {
              id
              entityState {
                id
              }
            }
            requiredInput {
              id
              key
              comparator
              not
              value
              field {
                id
                name
                type {
                  id
                  type
                  isMulti
                }
              }
            }
          }
        }
      }
    }
    defaultState {
      id
    }
  }
  ${INFORMATION_SLOT_TEMPLATE_FRAGMENT}
`

export const INFORMATION_SLOT_FRAGMENT = gql`
  fragment InformationSlotFragment on InformationSlot {
    id
    template {
      id
    }

    name
    description

    allowedTypes {
      id
      type
      isMulti
    }
    states {
      id
    }

    field {
      id
    }
  }
`

export const STATE_TRANSITION_FRAGMENT = gql`
  fragment StateTransitionFragment on StateTransition {
    id
    template {
      id
    }
    from {
      id
    }
    to {
      id
    }
    unlocks {
      id
    }
    requiredActions {
      id
    }
  }
`

export const PORTAL_FRAGMENT = gql`
  fragment PortalFragment on Portal {
    id
    template {
      id
    }

    name
    description

    entrance {
      id
      entity {
        id
      }
    }
  }
`

export const ENTRANCE_FRAGMENT = gql`
  fragment EntranceFragment on Entrance {
    id
    template {
      id
    }

    name
    description

    portal {
      id
      entity {
        id
      }
    }
  }
`

export const FIELD_FRAGMENT = gql`
  fragment FieldFragment on Field {
    id
    template {
      id
    }

    name
    description

    type {
      id
      type
      isMulti
    }
    isSecret

    value
    informationSlots {
      id
    }
  }
`

export const ACTION_REQUIREMENT_FRAGMENT = gql`
  fragment ActionRequirementFragment on ActionRequirement {
    id
    template {
      id
    }

    name
    description

    type
    hints {
      id
      text
      delay
    }

    payload {
      id
      template {
        id
      }

      requiredEntity {
        id
        entityState {
          id
        }
      }
      requiredInput {
        id
        key
        comparator
        not
        value
        field {
          id
          name
          isSecret
          type {
            id
            type
            isMulti
          }
        }
      }
    }
  }
`

export const ENTITY_FRAGMENT = gql`
  fragment EntityFragment on Entity {
    id
    template {
      id
      name
      isItem
      isObject
      isTrigger
      isGame
      isPortal
      isPlaceable
    }
    name
    description

    isItem
    isObject
    isTrigger
    isGame
    isContainer
    isPortal
    isPlaceable

    fields {
      ...FieldFragment
    }
    featuredField {
      id
    }

    container {
      id
    }
    containedEntities {
      id
    }

    entrances {
      ...EntranceFragment
    }
    portals {
      ...PortalFragment
    }

    informationSlots {
      ...InformationSlotFragment
    }

    states {
      id
      template {
        id
      }

      name
      description

      openPortals {
        id
      }
      availableInformationSlots {
        id
      }
      unlockedBy {
        id
        from {
          id
        }
      }
      incomingTransitions {
        id
        from {
          id
        }
      }
      outgoingTransitions {
        id
        template {
          id
        }

        from {
          id
        }
        to {
          id
        }
        unlocks {
          id
        }

        requiredActions {
          ...ActionRequirementFragment
        }
      }
    }
    defaultState {
      id
    }

    graphPosition {
      id
      left
      top
    }
    physicalPosition {
      id
      left
      top
      z
      width
      height
      rotation
    }
  }
  ${FIELD_FRAGMENT}
  ${ENTRANCE_FRAGMENT}
  ${PORTAL_FRAGMENT}
  ${INFORMATION_SLOT_FRAGMENT}
  ${ACTION_REQUIREMENT_FRAGMENT}
`

export const GAME_FRAGMENT = gql`
  fragment GameFragment on Game {
    id
    name
    slug
    description
    image

    intro
    outro

    publishedAt

    privacy
    accessType
    accessCode

    creator {
      id
      name
      slug
    }
    entities {
      ...EntityFragment
    }
    entityTemplateSets {
      id
      name
      description
    }
    startContainer {
      id
    }
  }
  ${ENTITY_FRAGMENT}
`
