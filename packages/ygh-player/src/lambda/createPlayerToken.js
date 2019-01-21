import './setup'
import firebase from '@firebase/app'

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { huntId } = JSON.parse(event.body)

  const db = firebase.firestore()

  const { id: playerToken } = await db
    .collection('hunts')
    .doc(huntId)
    .collection('players')
    .add({
      createdAt: new Date(),
      user: null,
    })

  return {
    statusCode: 200,
    body: JSON.stringify(playerToken)
  }
}
