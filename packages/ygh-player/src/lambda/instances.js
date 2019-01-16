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
        state: 'default',
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/battery',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '2',
        state: 'off',
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/flashlight',
          name: 'Flashlight',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '3',
        state: 'default',
        fieldValues: {},
        inputValues: {},
        entity: {
          name: 'Safe Key',
          id: '/entities/safe-key',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '4',
        state: 'default',
        fieldValues: {},
        inputValues: {},
        entity: {
          name: 'Seeds',
          id: '/entities/seeds',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '5',
        state: 'empty',
        fieldValues: {},
        inputValues: {},
        entity: {
          name: 'Watering Can',
          id: '/entities/watering-can',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '6',
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
        },
        entity: {
          id: '/entities/question',
          isItem: false,
          isObject: false,
        }
      },
      {
        id: '7',
        state: 'unread',
        fieldValues: {
          text: 'Hi there, Pioneer. What a pleasure to find you in my game. I made this game for you and only for you. Play it well and who knows what good may come to you... Enjoy - The creator',
        },
        inputValues: {},
        entity: {
          id: '/entities/note',
          isItem: false,
          isObject: false,
        }
      },
      {
        id: '/hunts/pioneer/entities/lamp',
        state: 'on',
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/lamp',
          isItem: false,
          isObject: true,
        },
      },
      {
        id: '/hunts/pioneer/entities/safe-with-keyhole',
        state: 'locked',
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/safe-with-keyhole',
          isItem: false,
          isObject: true,
        },
      },
      {
        id: '/hunts/pioneer/entities/instruction-note',
        state: 'unread',
        fieldValues: {
          text: 'Hello, here is how this works. I hope you understand now.'
        },
        inputValues: {},
        entity: {
          id: '/entities/instruction-note',
          isItem: false,
          isObject: true,
        }
      },
    ])
  }
}
