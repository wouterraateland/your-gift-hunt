import gql from "graphql-tag"

export const INFORMATION_FRAGMENT = gql`
  fragment InformationFragment on Information {
    id
    slot {
      id
    }
    fieldValue {
      id
      field {
        id
      }
    }
  }
`

export const ENTITY_INSTANCE_FRAGMENT = gql`
  fragment EntityInstanceFragment on EntityInstance {
    id
    name
    actionRequirementsWithCustomHints {
      id
    }
    information {
      ...InformationFragment
    }
    states {
      id
      unlockedBy {
        id
        from {
          id
          instance {
            id
          }
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
      }
      state {
        id
        name
        description
        availableInformationSlots {
          id
        }
        outgoingTransitions {
          id
          to {
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
                entity {
                  id
                }
                state {
                  id
                }
              }
              requiredValues {
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
    }
    fieldValues {
      id
      value
      field {
        id
        label
        info
        type {
          id
          type
          isMulti
        }
        isSecret
      }
    }
    hints {
      id
      text
      delay
      actionRequirement {
        id
      }
    }
    entity {
      id
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
        id
        name
        description
        allowedTypes {
          id
          type
          isMulti
        }
        entityStates {
          id
        }
        allowedTypes {
          id
          type
          isMulti
        }
      }
    }
  }
  ${INFORMATION_FRAGMENT}
`
