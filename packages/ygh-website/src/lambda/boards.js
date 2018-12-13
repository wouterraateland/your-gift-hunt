const boards = [
  {
    id: 0,
    width: 1,
    height: 1,
    pieceIds: [0],
    description: 'Dat antwoord was goed, goed begin! Deze is om je literaire kennis op te frissen. Op te halen bij de verjaardags commissie ;)',
  },
  {
    id: 1,
    width: 1,
    height: 1,
    pieceIds: [3],
    description: 'Je bent al goed aan het puzzelen! Deze heb je verdiend. Ik hoop dat het eten er heel lekker uit ziet op deze plankjes!',
  },
  {
    id: 2,
    width: 2,
    height: 2,
    pieceIds: [1, 2, 6, 10],
    description: 'Met dit cadeautje kan je straks nog lekkerdere dingen neerzetten dan je al doet. Zelfs zonder recept!',
  },
  {
    id: 3,
    width: 3,
    height: 3,
    pieceIds: [4, 5, 7, 8, 9, 11, 12, 13, 14],
    description: 'You did it! Je hebt de puzzel compleet. Nu verdien je je echte cadeautje... Je hebt .. en .. november al vrijgehouden en nu weet je waarvoor. We gaan op reis!',
  }
]

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(boards)
  }
}
