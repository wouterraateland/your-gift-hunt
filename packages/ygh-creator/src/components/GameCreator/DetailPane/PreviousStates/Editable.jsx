import React, { useCallback } from "react"

import { useAsync } from "ygh-hooks"
import useGameMutations from "hooks/useGameMutations"

import { components } from "react-select"

import { DisguisedSelectOptions, Button, Field } from "ygh-ui"
import Icons from "ygh-icons"
import StateTag from "components/Primitives/StateTag"

const Option = ({ data, ...otherProps }) => (
  <components.Option
    {...otherProps}
    cx={(a, b, c) =>
      `${Object.keys(b).reduce(
        (acc, key) => (b[key] ? `${acc} ${key}` : acc),
        a
      )} ${c}`
    }
  >
    <StateTag state={data.state} />
  </components.Option>
)

const EditablePrevStates = ({ state, prevStates, prevStateTemplates }) => {
  const { addPreviousState } = useGameMutations()
  const [{ isLoading, error }, runAsync] = useAsync()

  const options = prevStateTemplates
    .filter(({ id }) => prevStates.every(state => state.template.id !== id))
    .map(state => ({ state, value: state.id }))

  const onChange = useCallback(
    runAsync(event => addPreviousState(event.target.value, state.id)),
    [state]
  )

  if (error) {
    console.error(error)
  }

  const hasUnlocks = state.unlockedBy.length > 0

  return (
    <Field
      component={DisguisedSelectOptions}
      components={{
        Option
      }}
      render={props => (
        <Button
          {...props}
          size="small"
          importance="primary"
          color="primary"
          lead={<Icons.Plus />}
        >
          Add previous state
        </Button>
      )}
      options={options}
      value={prevStates.map(({ id }) => id)}
      onChange={onChange}
      error={error}
      disabled={isLoading || hasUnlocks}
      block
    />
  )
}

export default EditablePrevStates
