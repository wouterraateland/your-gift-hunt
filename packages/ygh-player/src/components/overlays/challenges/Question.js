import React, { useState, useContext } from 'react'

import StoreContext from 'context/Store'

import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import Paper from 'components/ui/Paper'

const Question = ({ pieceId, question }) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const { write } = useContext(StoreContext)

  function commitQuestion(event) {
    event.preventDefault()

    write('responses', responses => [
      ...(responses || []).filter(res => res.pieceId !== pieceId),
      { pieceId, response: value }
    ])

    setError(true)
  }

  return (
    <Paper>
      <Paper.Section>
        <h2>Opdracht #{pieceId + 1}</h2>
        <p>{question}</p>
        <Input
          label="Jouw antwoord"
          value={value}
          onChange={event => setValue(event.target.value)}
          block
        />
        {error
          ? <p>Dat antwoord is niet juist...</p>
          : <br />}
        <Button
          onClick={commitQuestion}
          block
        >Verstuur</Button>
      </Paper.Section>
    </Paper>
  )
}

export default Question
