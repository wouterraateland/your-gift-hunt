import React, { useState, useEffect } from "react"

import { Paper } from "ygh-ui"
import Section from "components/Section"

const TabbedSection = ({
  tabs,
  actions,
  placeholder,
  wrapContent = true,
  ...otherProps
}) => {
  const getInitialState = () => (tabs.length ? tabs[0].id : null)
  const [_selectedTab, selectTab] = useState(getInitialState())

  useEffect(() => {
    if (tabs.every(({ id }) => !id || id !== _selectedTab)) {
      selectTab(getInitialState())
    }
  }, [tabs])

  const selectedTab = _selectedTab
    ? tabs.find(({ id }) => id === _selectedTab)
    : null

  return (
    <Section noWrapper {...otherProps}>
      <Paper.Header>
        <Paper.Tabs>
          {tabs.map((tab, i) => (
            <Paper.Tab
              key={i}
              onClick={tab.id ? () => selectTab(tab.id) : undefined}
              isSelected={selectedTab && selectedTab.id === tab.id}
            >
              {tab.label}
            </Paper.Tab>
          ))}
        </Paper.Tabs>
        <Paper.Actions>
          {actions.map((tab, i) => (
            <Paper.Tab key={i}>{tab.label}</Paper.Tab>
          ))}
        </Paper.Actions>
      </Paper.Header>

      {tabs.some(({ id }) => id) ? (
        selectedTab ? (
          wrapContent ? (
            <Paper.Section>{selectedTab.content}</Paper.Section>
          ) : (
            selectedTab.content
          )
        ) : (
          <Paper.Section>
            <em>No tab selected yet.</em>
          </Paper.Section>
        )
      ) : (
        <Paper.Section>
          <em>{placeholder}</em>
        </Paper.Section>
      )}
    </Section>
  )
}

export default TabbedSection
