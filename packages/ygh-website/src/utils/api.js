const fetchLambda = async (lambda, params) => {
  const response = await fetch(`/.netlify/functions/${lambda}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...params,
    body: params.body ? JSON.stringify(params.body) : null
  })
  const json = await response.json()
  return json
}

export default fetchLambda
