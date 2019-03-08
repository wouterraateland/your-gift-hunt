import gql from "graphql-tag"

export const ENTITY_INSTANCE_FRAGMENT = gql`
  fragment EntityInstanceFragment on EntityInstance {
    id
    name
    actionRequirementsWithCustomHints {
      id
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
                eqValue
                neqValue
                eqField {
                  id
                }
                neqField {
                  id
                }
              }
            }
          }
        }
      }
    }
    fields {
      id
      value
      field {
        id
        label
        info
        type
        isMulti
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
    }
  }
`
