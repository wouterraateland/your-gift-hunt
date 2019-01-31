import {
  getEntities,
  getTriggers,
  getHuntNodes,
  getHuntEntities,
  getHuntTriggers
} from './utils'

export const handler = async (event, context) => {
  const huntId = 'pioneer'

  const [entities, triggers] = await Promise.all([
    getEntities(),
    getTriggers(),
  ])

  const [nodes, entityInstances, triggerInstances] = await Promise.all([
    getHuntNodes(huntId),
    getHuntEntities(huntId),
    getHuntTriggers(huntId),
  ])

  return {
    statusCode: 200,
    body: JSON.stringify({
      entities,
      triggers,
      nodes,
      entityInstances,
      triggerInstances,
    })
  }
}
