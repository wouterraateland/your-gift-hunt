import gql from "graphql-tag"

export const INFORMATION_SLOT_FRAGMENT = gql`
  fragment InformationSlotFragment on InformationSlot {
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
    field {
      id
    }
  }
`

export const ENTITY_FRAGMENT = gql`
  fragment EntityFragment on Entity {
    id
    template {
      id
    }
    name
    description

    isItem
    isObject
    isTrigger

    defaultState {
      id
    }
    featuredField {
      id
    }

    informationSlots {
      ...InformationSlotFragment
    }
    states {
      id
      name
      description
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
        to {
          id
        }
        unlocks {
          id
        }
        requiredActions {
          id
          name
          type
          payload {
            id
            requiredEntity {
              id
              entityState {
                id
              }
            }
            requiredInputs {
              id
              key
              comparator
              not
              value
              field {
                id
              }
            }
          }
        }
      }
    }
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

      value

      information {
        id
      }
    }
  }
  ${INFORMATION_SLOT_FRAGMENT}
`
