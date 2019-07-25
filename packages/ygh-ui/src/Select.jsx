import React, { useMemo } from "react"
import ReactSelect from "react-select"
import styled from "styled-components"
import { transparentize } from "polished"

import { useTheme } from "ygh-hooks"
import Icons from "ygh-icons"

const createStyles = theme => ({
  control: (base, state) => ({
    ...base,
    width: "100%",
    borderWidth: theme.borderWidth,
    boxShadow: state.isFocused
      ? `0 0 0 4px ${transparentize(0.5)(theme.color.primary)}`
      : "none",
    borderColor: state.isDisabled
      ? "#0001"
      : state.isFocused
      ? theme.color.primary
      : state.isHovered
      ? "#0004"
      : "#0002",
    ":hover": state.isFocused
      ? {
          borderColor: theme.color.primary
        }
      : {}
  }),
  placeholder: (base, state) =>
    state.isDisabled
      ? {
          ...base,
          margin: "0 0.25rem",
          color: transparentize(0.5)(theme.color.text)
        }
      : { ...base, margin: "0 0.25rem" },
  dropdownIndicator: base => ({ ...base, cursor: "pointer" }),
  indicatorsContainer: base => ({
    ...base,
    backgroundColor: "transparent",
    borderLeft: "none"
  }),
  indicatorSeparator: () => ({}),
  menu: base => ({
    ...base,
    border: `${theme.borderWidth} solid ${theme.color.primary}`,
    boxShadow: theme.boxShadow.medium
  }),
  option: (base, state) =>
    state.isSelected
      ? { ...base, backgroundColor: theme.color.primary }
      : state.isHovered || state.isFocused
      ? { ...base, backgroundColor: transparentize(0.75)(theme.color.primary) }
      : { ...base },
  valueContainer: base => ({
    ...base,
    padding: `calc(.25rem - ${theme.borderWidth})`
  }),
  input: base => ({
    ...base,
    height: "1.5rem",
    margin: "0.25rem"
  }),
  singleValue: base => ({
    ...base,
    margin: "0 0.25rem"
  }),
  multiValue: () => ({
    display: "flex",
    fontSize: "0.75rem",
    backgroundColor: "#0002",
    borderRadius: theme.borderRadius,
    margin: ".25rem"
  }),
  multiValueLabel: () => ({
    padding: "0.375rem 0.5rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  })
})

const _PaddedIcon = styled.div`
  padding: 0.375rem 0.5rem;
`

const PaddedIcon = ({ icon: Icon, ...props }) => (
  <_PaddedIcon {...props}>
    <Icon />
  </_PaddedIcon>
)

const Select = ({
  selectComponent: SelectComponent = ReactSelect,
  ...otherProps
}) => {
  const theme = useTheme()
  const styles = useMemo(
    () => ({
      ...createStyles(theme),
      ...otherProps.styles
    }),
    [otherProps.styles, theme]
  )

  return (
    <SelectComponent
      {...otherProps}
      components={{
        MultiValueRemove: ({ innerProps }) => (
          <PaddedIcon icon={Icons.Cross} {...innerProps} />
        ),
        DropdownIndicator: ({ innerProps }) => (
          <PaddedIcon icon={Icons.Caret} {...innerProps} />
        ),
        ClearIndicator: ({ innerProps }) => (
          <PaddedIcon icon={Icons.Cross} {...innerProps} />
        ),
        ...otherProps.components
      }}
      styles={styles}
    />
  )
}

export default Select
