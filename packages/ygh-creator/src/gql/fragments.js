import gql from "graphql-tag"

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
      template {
        id
      }

      name
      description
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
          id
          template {
            id
          }

          name
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
            requiredInputs {
              id
              key
              comparator
              not
              value
              field {
                id
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
    fields {
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

      information {
        id
      }
    }
  }
  ${INFORMATION_SLOT_FRAGMENT}
`
