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
        id: '3',
        isItem: true,
        isObject: false,
        entity: '/entities/safe-key', state: 'default'
      },
      {
        id: '4',
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
      {
        id: '6',
        isItem: false,
        isObject: false,
        entity: '/entities/question',
        state: 'unanswered',
        fieldValues: {
          question: 'What is the highest mountain?',
          answer: [
            'Mount Everest',
            'MT Everest',
          ]
        },
        inputValues: {
          answer: 'Kilimanjaro'
        }
      },
      {
        id: '7',
        isItem: false,
        isObject: false,
        entity: '/entities/note',
        state: 'unread',
        fieldValues: {
          text: 'Hi there, Pioneer. What a pleasure to find you in my game. I made this game for you and only for you. Play it well and who knows what good may come to you... Enjoy - The creator',
        },
        inputValues: {}
      },
      {
        id: '/hunts/pioneer/entities/lamp',
        isItem: false,
        isObject: true,
        entity: '/entities/lamp', state: 'on'
      },
      {
        id: '/hunts/pioneer/entities/safe-with-keyhole',
        isItem: false,
        isObject: true,
        entity: '/entities/safe-with-keyhole',
        state: 'locked',
        fieldValues: {},
        inputValues: {},
      },
      {
        id: '/hunts/pioneer/entities/instruction-note',
        isItem: false,
        isObject: true,
        entity: '/entities/instruction-note',
        state: 'unread',
        fieldValues: {
          text: 'Hello, here is how this works. I hope you understand now.'
        },
        inputValues: {},
      },
    ])
  }
}
