import { ACTION_TYPES, EDGE_TYPES, NODE_TYPES } from "data"
import hash from "object-hash"

const getEntryEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.ENTRY)
    .flatMap(entryNode => {
      const stateNode = nodes.find(
        ({ type, entity }) =>
          type === NODE_TYPES.STATE && entity.id === entryNode.entity.id
      )
      return stateNode
        ? {
            type: EDGE_TYPES.ENTRY,
            from: entryNode.id,
            to: stateNode.id
          }
        : []
    })

const getTransformEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, entity, state }) =>
      state.outgoingTransitions.map(({ to }) => ({
        from: id,
        to: to ? to.id : `${entity.id}-${NODE_TYPES.EXIT}`,
        type: to ? EDGE_TYPES.TRANSFORM : EDGE_TYPES.EXIT
      }))
    )

const getUnlockEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, entity, state }) =>
      state.outgoingTransitions.flatMap(({ to, unlocks }) =>
        unlocks.map(unlock => ({
          from: id,
          to: to ? to.id : `${entity.id}-${NODE_TYPES.EXIT}`,
          unlocks: unlock.id,
          type: EDGE_TYPES.UNLOCK
        }))
      )
    )

const getUseEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, state: { outgoingTransitions } }) =>
      outgoingTransitions.flatMap(({ requiredActions }) =>
        requiredActions
          .filter(({ type }) => type === ACTION_TYPES.USE)
          .map(({ payload: { requiredEntity: { entityState } } }) => ({
            from: id,
            to: entityState.id,
            type: EDGE_TYPES.USE
          }))
      )
    )

const getTargetOfUseEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, state: { outgoingTransitions } }) =>
      outgoingTransitions.flatMap(({ requiredActions }) =>
        requiredActions
          .filter(({ type }) => type === ACTION_TYPES.TARGET_OF_USE)
          .map(({ payload: { requiredEntity: { entityState } } }) => ({
            from: entityState.id,
            to: id,
            type: EDGE_TYPES.USE
          }))
      )
    )

const getInfoEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.INFORMATION_SLOT)
    .flatMap(({ id, informationSlot }) =>
      informationSlot.field
        ? [
            {
              from: id,
              to: informationSlot.field.id,
              type: EDGE_TYPES.INFO
            }
          ]
        : []
    )

const getInfoAvailabilityEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, state }) =>
      state.availableInformationSlots.map(informationSlot => ({
        from: id,
        to: informationSlot.id,
        type: EDGE_TYPES.INFO_AVAILABILITY
      }))
    )

const getFieldUsageEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, state }) =>
      state.outgoingTransitions.flatMap(outgoingTransition =>
        outgoingTransition.requiredActions
          .filter(
            ({ payload: { requiredInput } }) =>
              requiredInput &&
              requiredInput.field &&
              requiredInput.field.isSecret
          )
          .map(({ payload: { requiredInput: { field } } }) => ({
            from: field.id,
            to: id,
            type: EDGE_TYPES.FIELD_USAGE
          }))
      )
    )

const getPortalEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.ENTITY)
    .flatMap(({ entity: { portals } }) =>
      portals
        .filter(({ entrance }) => entrance)
        .map(({ id, entrance }) => ({
          from: id,
          to: entrance.id,
          type: EDGE_TYPES.PORTAL
        }))
    )

const getPortalOpennessEdges = nodes =>
  nodes
    .filter(({ type }) => type === NODE_TYPES.STATE)
    .flatMap(({ id, state }) =>
      state.openPortals.map(portal => ({
        from: id,
        to: portal.id,
        type: EDGE_TYPES.PORTAL_OPENNESS
      }))
    )

const withEdgeId = edge => ({
  ...edge,
  id: hash(Object.values(edge))
})

const uniqueBy = key => (acc, x) =>
  acc.some(y => y[key] === x[key]) ? acc : [...acc, x]

const calcEdges = nodes =>
  [
    getEntryEdges,
    getTransformEdges,
    getUnlockEdges,
    getUseEdges,
    getTargetOfUseEdges,
    getInfoEdges,
    getInfoAvailabilityEdges,
    getFieldUsageEdges,
    getPortalEdges,
    getPortalOpennessEdges
  ]
    .reduce((edges, f) => edges.concat(f(nodes)), [])
    .map(withEdgeId)
    .reduce(uniqueBy("id"), [])

export default calcEdges
