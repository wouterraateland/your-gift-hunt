import querystring from 'querystring'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

const startDate = new Date(2018, 11 - 1, 6) // 5 Nov 2018
const targetDate = new Date(2018, 12 - 1, 14) // 14 Dec 2018

const constant = x => () => x

const codesCollected = codes => collectedCodes =>
  codes.every(code => collectedCodes.includes(code))

const piecesCompleted = pieceIds => (_, pieces) =>
  pieces
    .filter(piece => pieceIds.includes(piece.id))
    .every(piece => piece.challenge.completed)

const daysLeft = n => () =>
  Date.now() + n * DAY > targetDate

const daysPassed = n => () =>
  Date.now() - n * DAY > startDate

const isString = match => s =>
  typeof s === 'string' &&
  s.toLowerCase() === match

/*
Available codes:
 - ofgG59w4 => Fry
 - 7uciossJ => disney_1
 - cOW0bvGG => disney_3
 - s1Y8LINb => disney_5
 - VZ5zIRz6 => disney_6
 - xN56rM9e => disney_7
*/

const pieces = [
  {
    id: 0,
    image: '/images/animal_farm.jpeg',
    isAvailable: constant(true),
    challenge: {
      type: 'question',
      question: 'Even een makkelijke om mee te beginnen: Wat is jouw favoriete kleur?',
      validateResponse: isString('geel'),
    },
  },
  {
    id: 1,
    image: '/images/fry.jpeg',
    isAvailable: piecesCompleted([0]),
    challenge: {
      type: 'question',
      question: `
        Volgens mij snap je het! Nu wat moeilijker...
        "Ik heb een groen huis.
        In mijn groene huis zit een wit huis.
        In mijn witte huis zit een rood huis.
        In mijn rode huis zitten een hele hoop baby's.
        Wat ben ik?"
      `,
      validateResponse: isString('watermeloen')
    },
  },
  {
    id: 2,
    image: '/images/artichoke.jpeg',
    isAvailable: codesCollected(['ofgG59w4']),
    challenge: { type: 'none' },
  },
  {
    id: 3,
    image: '/images/leisteen.jpeg',
    isAvailable: (codes, pieces) => daysPassed(2)() && piecesCompleted([2])(codes, pieces),
    challenge: {
      type: 'question',
      question: 'Hoe spel je Amsterdam met 7 letters?',
      validateResponse: response =>
        typeof response === 'string' &&
        (
          response.toLowerCase().includes('cirkel') ||
          response.toLowerCase().includes('rond')
        )
    },
  },
  {
    id: 4,
    image: '/images/disney_1.jpeg',
    isAvailable: codesCollected(['7uciossJ']),
    challenge: { type: 'none' },
  },
  {
    id: 5,
    image: '/images/disney_2.jpeg',
    isAvailable: constant(true),
    challenge: {
      type: 'code',
      code: '7291',
    },
  },
  {
    id: 6,
    image: '/images/pie.jpeg',
    isAvailable: constant(true),
    challenge: {
      type: 'plant',
      validateResponse: isString('qroiuqpinvrin'),
    },
  },
  {
    id: 7,
    image: '/images/disney_3.jpeg',
    isAvailable: codesCollected(['cOW0bvGG']),
    challenge: { type: 'none' },
  },
  {
    id: 8,
    image: '/images/disney_4.jpeg',
    isAvailable: constant(false),
    challenge: { type: 'none' },
  },
  {
    id: 9,
    image: '/images/disney_5.jpeg',
    isAvailable: codesCollected(['s1Y8LINb']),
    challenge: { type: 'none' },
  },
  {
    id: 10,
    image: '/images/soup.jpeg',
    isAvailable: piecesCompleted([9]),
    challenge: {
      type: 'question',
      question: 'Noem 4 belangrijke ingredienten van goed eten',
      validateResponse: res => {
        if (typeof res !== 'string') { return false }
        const lc = res.toLowerCase()
        return (
          (lc.includes('salt') || lc.includes('zout')) &&
          (lc.includes('fat') || lc.includes('vet')) &&
          (lc.includes('acid') || lc.includes('zuur')) &&
          (lc.includes('heat') || lc.includes('hitte'))
        )
      }
    },
  },
  {
    id: 11,
    image: '/images/disney_6.jpeg',
    isAvailable: codesCollected(['VZ5zIRz6']),
    challenge: { type: 'none' },
  },
  {
    id: 12,
    image: '/images/disney_7.jpeg',
    isAvailable: codesCollected(['xN56rM9e']),
    challenge: { type: 'none' },
  },
  {
    id: 13,
    image: '/images/disney_8.jpeg',
    isAvailable: daysLeft(3),
    challenge: {
      type: 'question',
      question: 'Waar gaan we heen?',
      validateResponse: isString('disneyland parijs'),
    }
  },
  {
    id: 14,
    image: '/images/disney_9.jpeg',
    isAvailable: daysLeft(1),
    challenge: {
      type: 'question',
      question: 'Heb je er zin in?',
      validateResponse: res =>
        typeof res === 'string' &&
        res.toLowerCase().includes('ja'),
    }
  },
]

const parseQuestion = ({ validateResponse, ...rest }, response) => ({
  ...rest,
  completed: validateResponse(response ? response.response : null)
})

const parseCode = ({ code, ...rest }, response) => ({
  ...rest,
  length: code.length,
  completed: response && response.response === code,
})

const parseChallenge = ({ type, ...challenge }, response) => {
  switch (type) {
    case 'question':
    case 'plant': return parseQuestion(challenge, response)
    case 'code': return parseCode(challenge, response)
    default: return { completed: true }
  }
}

const getPieces = (responses, codes) => {
  return pieces
    .map(({ challenge, ...piece }) => {
      const response = responses
        .find(res => res.pieceId === piece.id)

      return {
        ...piece,
        challenge: {
          type: challenge.type,
          ...parseChallenge(challenge, response)
        }
      }
    })
    .filter((piece, _, pieces) => piece.isAvailable(codes, pieces))
    .map(piece => ({
      ...piece,
      image: piece.challenge.completed ? piece.image : null,
    }))

  return pieces
}

export const handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { responses, codes } = JSON.parse(event.body)

  return {
    statusCode: 200,
    body: JSON.stringify(getPieces(responses || [], codes || []))
  }
}
