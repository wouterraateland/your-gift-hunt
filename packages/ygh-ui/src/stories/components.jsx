import React, { useState } from "react"

import { storiesOf } from "@storybook/react"
import { boolean, number, optionsKnob as options } from "@storybook/addon-knobs"

import {
  Accordion,
  InputType,
  Loader,
  Menu,
  Message,
  Paper,
  ProgressRing,
  SplitPane,
  ToolTip
} from "../"

import styled from "styled-components"
import Align from "../Align"
import FullHeight from "../FullHeight"

const Abs = styled.div`
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background-color: #f12;
`

storiesOf("Components", module)
  .add("Accordion", () => {
    const [state, setState] = useState(null)

    return (
      <Accordion state={state} setState={setState}>
        <Accordion.Section collapsible={false}>
          Non collapsible section. Accordion state:
          <pre>{JSON.stringify(state)}</pre>
        </Accordion.Section>
        <Accordion.Section title="Section 1">
          Content for section 1
        </Accordion.Section>
        <Accordion.Section title="Section 2">
          Content for section 2
        </Accordion.Section>
        <Accordion.Section title="Section 3">
          Content for section 3
        </Accordion.Section>
      </Accordion>
    )
  })
  .add("InputType", () => (
    <InputType
      type={options(
        "Type",
        {
          Text: "text",
          Number: "number",
          Geopoint: "geopoint",
          Datetime: "datetime-local",
          Undefined: ""
        },
        "default",
        { display: "inline-radio" }
      )}
      isMulti={boolean("Multi", false)}
    />
  ))
  .add("Loader", () => (
    <Align.Center>
      <h3>Normal</h3>
      <Loader />
      <h3>Small</h3>
      <Loader.Small />
      <h3>Tiny</h3>
      <Loader.Tiny />
    </Align.Center>
  ))
  .add("Menu", () => (
    <Menu.Container>
      <Menu.Toggle />
      <Menu.Items>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Items>
    </Menu.Container>
  ))
  .add("Message", () => (
    <>
      <Message.Default>Default</Message.Default>
      <Message.Success>Success!</Message.Success>
      <Message.Warning>Warning!</Message.Warning>
      <Message.Error>Error!</Message.Error>
    </>
  ))
  .add("Paper", () => (
    <Paper isFlat={boolean("Flat", false)}>
      <Paper.Header>
        <Paper.Tabs>
          <Paper.Tab>Tab 1</Paper.Tab>
          <Paper.Tab>Tab 2</Paper.Tab>
          <Paper.Tab>Tab 3</Paper.Tab>
          <Paper.Tab>Tab 4</Paper.Tab>
          <Paper.Tab>Tab 5</Paper.Tab>
          <Paper.Tab>Tab 6</Paper.Tab>
        </Paper.Tabs>
        <Paper.Actions>
          <Paper.Tab>Action 1</Paper.Tab>
          <Paper.Tab>Action 2</Paper.Tab>
        </Paper.Actions>
      </Paper.Header>
      <Paper.Section>Content</Paper.Section>
    </Paper>
  ))
  .add("Progress Ring", () => (
    <ProgressRing
      progress={number("Progress", 0.65, { min: 0, max: 1, step: 0.01 })}
    />
  ))
  .add("Split Pane", () => (
    <FullHeight>
      <SplitPane split="vertical" primary="first" initialSize={256}>
        {boolean("Show left pane", false) && <strong>Left pane</strong>}
        <SplitPane
          split="vertical"
          primary="second"
          initialSize={256}
          maxSize={384}
        >
          <SplitPane
            split="horizontal"
            primary="first"
            minSize={100}
            maxSize={200}
          >
            <strong>B</strong>
            <strong>C</strong>
          </SplitPane>
          {boolean("Show inspector", false) && <strong>Inspector pane</strong>}
        </SplitPane>
      </SplitPane>
    </FullHeight>
  ))
  .add("ToolTip", () => (
    <>
      <Abs style={{ left: 0, top: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ right: 0, top: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ right: 0, bottom: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ left: 0, bottom: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ left: "50%", top: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ left: 0, top: "50%" }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ left: "50%", bottom: 0 }}>
        <ToolTip>Content</ToolTip>
      </Abs>
      <Abs style={{ right: 0, top: "50%" }}>
        <ToolTip>Content</ToolTip>
      </Abs>
    </>
  ))
