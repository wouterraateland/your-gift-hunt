import querystring from 'querystring'

export const handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: '1',
        isItem: true,
        isObject: false,
        entity: '/entities/battery', state: 'default'
      },
      {
        id: '2',
        isItem: true,
        isObject: false,
        name: 'Flashlight',
        entity: '/entities/flashlight', state: 'off'
      },
      {
        id: '4',
        isItem: true,
        isObject: false,
        entity: '/entities/safe-key', state: 'default'
      },
      {
        id: '3',
        isItem: true,
        isObject: false,
        entity: '/entities/seeds', state: 'default'
      },
      {
        id: '5',
        isItem: true,
        isObject: false,
        entity: '/entities/watering-can', state: 'empty'
      },
    ])
  }
}
