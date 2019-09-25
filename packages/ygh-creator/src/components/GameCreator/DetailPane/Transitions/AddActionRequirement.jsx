import { ACTION_TYPES } from "data"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

import useEntities from "hooks/useEntities"
import { useAsync, useClickOutside } from "ygh-hooks"

import { Button, Field, SelectOptions } from "ygh-ui"
import EntityTag from "components/Primitives/EntityTag"
import StateTag from "components/Primitives/StateTag"

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-right: -0.5rem;

  & label {
    flex-grow: 1;
    margin: 0 0.5rem 0.5rem 0;
  }

  & button {
    margin: 0 0.5rem 0.5rem 0;
  }

  & label:nth-of-type(1) {
    width: 100%;
  }
  & label:nth-of-type(2) {
    width: 9rem;
  }
  & label:nth-of-type(3) {
    width: 7rem;
  }
`

const AddActionRequirement = ({ entity, state, transition, onClose }) => {
  const { entities } = useEntities()

  const ref = useRef(null)
  useClickOutside({ ref, onClickOutside: onClose })

  const allEntityOptions = useMemo(
    () =>
      entities
        .filter(({ id }) => id !== entity.id)
        .map(entity => ({
          label: <EntityTag entity={entity} />,
          value: entity.id,
          entity: entity,
          allStateOptions: entity.states.map(state => ({
            label: <StateTag state={state} />,
            value: state.id,
            state: state
          }))
        })),
    [entities, entity, state, transition]
  )
  // TODO: filter possible entities and states

  const [
    {
      selectedType,
      selectedEntity,
      selectedState,
      entityOptions,
      stateOptions
    },
    setState
  ] = useState({
    selectedType: entity.isItem ? ACTION_TYPES.USE : ACTION_TYPES.TARGET_OF_USE,
    selectedEntity: null,
    selectedState: null,
    entityOptions: [],
    stateOptions: []
  })

  useEffect(() => {
    setState(prevState => {
      const entityOptions =
        prevState.selectedType === ACTION_TYPES.TARGET_OF_USE
          ? allEntityOptions.filter(option => option.entity.isItem)
          : allEntityOptions

      return {
        ...prevState,
        entityOptions,
        selectedEntity: entityOptions.some(
          ({ value }) => value === prevState.selectedEntity
        )
          ? prevState.selectedEntity
          : entityOptions.length
          ? entityOptions[0].value
          : null
      }
    })
  }, [entity, allEntityOptions, selectedType])

  useEffect(() => {
    setState(prevState => {
      const stateOptions = prevState.selectedEntity
        ? prevState.entityOptions.find(
            ({ value }) => value === prevState.selectedEntity
          ).allStateOptions
        : []

      return {
        ...prevState,
        stateOptions,
        selectedState: stateOptions.some(
          ({ value }) => value === prevState.selectedState
        )
          ? prevState.selectedState
          : stateOptions.length
          ? stateOptions[0].value
          : null
      }
    })
  }, [state, allEntityOptions, selectedEntity])

  const [{ isLoading }, runAsync] = useAsync()

  const onSubmit = useCallback(
    runAsync(async () => {
      // TODO: Implement adding action requirement
      onClose()
    }),
    [onClose]
  )

  return (
    <Form onSubmit={onSubmit} ref={ref}>
      <Field
        label="Action type"
        type="select"
        component={SelectOptions}
        options={[
          ...(entity.isItem
            ? [
                {
                  value: ACTION_TYPES.USE,
                  label: "Use"
                }
              ]
            : []),
          {
            value: ACTION_TYPES.TARGET_OF_USE,
            label: "Target of use"
          }
        ]}
        value={selectedType}
        onChange={({ target: { value } }) =>
          setState(state => ({ ...state, selectedType: value }))
        }
        disabled={isLoading}
      />
      <Field
        type="select"
        label="Entity"
        component={SelectOptions}
        options={entityOptions}
        value={selectedEntity}
        onChange={({ target: { value } }) =>
          setState(state => ({ ...state, selectedEntity: value }))
        }
        disabled={isLoading}
      />
      <Field
        type="select"
        label="State"
        component={SelectOptions}
        options={stateOptions}
        value={selectedState}
        onChange={({ target: { value } }) =>
          setState(state => ({ ...state, selectedState: value }))
        }
        disabled={isLoading}
      />
      <Button
        type="submit"
        importance="primary"
        color="success"
        disabled={isLoading}
      >
        ✓
      </Button>
    </Form>
  )
}

export default AddActionRequirement
