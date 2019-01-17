import querystring from 'querystring'

export const handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: '/hunts/pioneer/entities/battery',
        state: {
          id: '/entities/battery/states/default',
        },
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/battery',
          isItem: true,
          isObject: false,
        },
      },
      {
        id: '/hunts/pioneer/entities/flashlight',
        state: {
          id: '/entities/flashlight/states/empty',
        },
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
        id: '/hunts/pioneer/entities/safe-key',
        state: {
          id: '/entities/safe-key/states/default',
        },
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
        id: '/hunts/pioneer/entities/seeds',
        state: {
          id: '/entities/seeds/states/default',
        },
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
        id: '/hunts/pioneer/entities/watering-can',
        state: {
          id: '/entities/watering-can/states/empty',
        },
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
        id: '/hunts/pioneer/entities/question-one',
        state: {
          id: '/entities/question/states/unanswered',
        },
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
        id: '/hunts/pioneer/entities/welcome-note',
        state: {
          id: '/entities/note/states/unread',
        },
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
        state: {
          id: '/entities/lamp/states/on',
        },
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/lamp',
          isItem: false,
          isObject: true,
        },
      },
      {
        id: '/hunts/pioneer/entities/sink',
        state: {
          id: '/entities/sink/states/connected',
        },
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/sink',
          isItem: false,
          isObject: true,
        },
      },
      {
        id: '/hunts/pioneer/entities/plant-pot',
        state: {
          id: '/entities/plant-pot/states/empty',
        },
        fieldValues: {},
        inputValues: {},
        entity: {
          id: '/entities/plant-pot',
          isItem: false,
          isObject: true,
        },
      },
      {
        id: '/hunts/pioneer/entities/safe-with-keyhole',
        state: {
          id: '/entities/safe-with-keyhole/states/locked',
        },
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
        state: {
          id: '/entities/instruction-note/states/unread',
        },
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
