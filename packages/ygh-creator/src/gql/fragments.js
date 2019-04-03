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
      name
      isItem
      isObject
      isTrigger
    }
    name
    description

    isItem
    isObject
    isTrigger

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
      informationSlots {
        id
      }
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
  ${INFORMATION_SLOT_FRAGMENT}
`

export const ENTITY_TEMPLATE_FRAGMENT = gql`
  fragment EntityTemplateFragment on EntityTemplate {
    id
    name
    description

    isItem
    isObject
    isTrigger

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

    informationSlots {
      ...InformationSlotTemplateFragment
    }

    states {
      id

      name
      description

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
