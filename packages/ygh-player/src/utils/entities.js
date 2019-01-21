export const hasState = (entityId, stateId) => (instance) =>
  !!(instance && instance.state) &&
  (Array.isArray(entityId) ? entityId : [entityId])
    .map(entityId => stateId)
    .includes(instance.state)
