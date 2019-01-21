import { getHuntStateForPlayer } from './utils'

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { huntId, playerToken } = JSON.parse(event.body)

  if (!huntId || !playerToken) {
    return { statusCode: 500, body: "Parameter Missing" }
  }

  const state = await getHuntStateForPlayer(huntId, playerToken)

  return {
    statusCode: 200,
    body: JSON.stringify(state)
  }
}
