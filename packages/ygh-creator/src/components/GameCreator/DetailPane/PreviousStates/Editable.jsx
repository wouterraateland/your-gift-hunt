import React, { useCallback } from "react"

import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import { DisguisedSelectOptions, Button, Field } from "ygh-ui"
import StateTag from "components/Primitives/StateTag"

const EditablePrevStates = ({ state, prevStates, prevStateTemplates }) => {
  const { addPreviousState } = useGameMutations()
  const [{ isLoading, error }, runAsync] = useAsync()
  // const [optionsVisible, setOptionsVisibility] = useState(false)

  const options = prevStateTemplates.filter(({ id }) =>
    prevStates.every(state => state.template.id !== id)
  )
  const onChange = useCallback(
    runAsync(async event => {
      console.log(event)
      // addPreviousState(stateTemplateId, state.id)
    })
  )

  // if (error) {
  //   console.error(error)
  // }

  // const onOptionsClose = () => setOptionsVisibility(false)
  // const onAddButtonClick = () => setOptionsVisibility(true)

  const hasUnlocks = state.unlockedBy.length > 0

  return (
    <Field
      component={DisguisedSelectOptions}
      components={{
        Option: ({ data }) => <StateTag state={data} />
      }}
      options={options}
      value={prevStates.map(({ id }) => id)}
      onChange={onChange}
      error={error}
      disabled={isLoading || hasUnlocks}
      render={props => (
        <Button {...props} size="small" importance="primary" color="primary">
          + Add previous state
        </Button>
      )}
    />
  )
}

export default EditablePrevStates
