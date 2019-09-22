import React, { useCallback } from "react"

import { useAsync } from "ygh-hooks"
import useGameMutations from "hooks/useGameMutations"

import { components } from "react-select"

import { DisguisedSelectOptions, ActionButton, ToolTip, Field } from "ygh-ui"
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
      onClick={event => event.stopPropagation()}
      component={DisguisedSelectOptions}
      components={{
        Option
      }}
      styles={{
        option: base => ({ ...base, padding: ".5rem", lineHeight: "1.5rem" }),
        container: base => ({ ...base, position: "static" }),
        menu: base => ({ ...base, left: 0 })
      }}
      render={({ onClick, ...props }) => (
        <ActionButton
          {...props}
          onClick={event => {
            event.stopPropagation()
            typeof onClick === "function" && onClick(event)
          }}
          color="primary"
        >
          <Icons.Plus />
          <ToolTip>Add previous state</ToolTip>
        </ActionButton>
      )}
      options={options}
      value={prevStates.map(({ id }) => id)}
      onChange={onChange}
      error={error}
      disabled={isLoading || hasUnlocks}
    />
  )
}

export default EditablePrevStates
