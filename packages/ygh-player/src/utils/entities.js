export const hasState = (entityId, stateId) => (instance) =>
  !!(instance && instance.state) &&
  (Array.isArray(entityId) ? entityId : [entityId])
    .map(entityId => `/entities/${entityId}/states/${stateId}`)
    .includes(instance.state.id)
