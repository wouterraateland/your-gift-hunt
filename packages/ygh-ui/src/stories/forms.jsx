import React, { useState } from "react"

import { storiesOf } from "@storybook/react"
import { boolean, optionsKnob as options } from "@storybook/addon-knobs"

import * as Icons from "ygh-icons"
import {
  Button,
  Paper,
  Form,
  FieldGroup,
  Field,
  DefaultInput,
  ColorInput,
  ImageInput,
  GeopointInput,
  TagInput,
  DefaultOptions,
  DisguisedSelectOptions,
  SelectOptions,
  TabOptions
} from "../"

storiesOf("Forms.Fields.Inputs", module)
  .add("Default input", () => {
    const [value, setValue] = useState("")
    return (
      <Paper>
        <Paper.Section>
          <Field
            size={options(
              "Size",
              {
                Tiny: "tiny",
                Small: "small",
                Medium: "medium",
                Large: "large"
              },
              "medium",
              { display: "inline-radio" }
            )}
            lead={boolean("Leading icon", false) ? <Icons.Loop /> : null}
            trail={boolean("Trailing icon", false) ? <Icons.Play /> : null}
            prefix={boolean("Prefix text", false) ? "#" : null}
            suffix={boolean("Suffix text", false) ? "@gmail.com" : null}
            label="Input label"
            info={
              boolean("Extra info", false)
                ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                : null
            }
            type={options(
              "Type",
              {
                Date: "date",
                DateTime: "datetime-local",
                Month: "month",
                Week: "week",
                Time: "time",

                Text: "text",
                Number: "number",
                Textarea: "textarea",
                Password: "password",
                Search: "search",

                Email: "email",
                Telephone: "tel",
                URL: "url",

                Color: "color",
                File: "file"
              },
              "text",
              { display: "inline-radio" }
            )}
            placeholder="Jan"
            disabled={boolean("Disabled", false)}
            resizeH={boolean("Resize horizontal", false)}
            error={boolean("Error", false) ? "Something went wrong!" : null}
            value={value}
            onChange={event => setValue(event.target.value)}
            component={DefaultInput}
          />
        </Paper.Section>
      </Paper>
    )
  })
  .add("Image input", () => (
    <Paper>
      <Paper.Section>
        <Field
          label="Avatar"
          type="file"
          disabled={boolean("Disabled", false)}
          error={
            boolean("Error", false) ? "Image doesn't meet requirements!" : null
          }
          component={ImageInput}
        />
      </Paper.Section>
    </Paper>
  ))
  .add("Color input", () => {
    const [value, setValue] = useState("")
    return (
      <Paper>
        <Paper.Section>
          <Field
            label="Favourite color"
            type="color"
            disabled={boolean("Disabled", false)}
            error={boolean("Error", false) ? "Wrong color!" : null}
            component={ColorInput}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Paper.Section>
      </Paper>
    )
  })
  .add("Geopoint input", () => {
    const [value, setValue] = useState(null)
    return (
      <Paper>
        <Paper.Section>
          <Field
            label="Your location"
            type="geopoint"
            disabled={boolean("Disabled", false)}
            error={boolean("Error", false) ? "Wrong color!" : null}
            component={GeopointInput}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Paper.Section>
      </Paper>
    )
  })
  .add("Tag input", () => {
    const [value, setValue] = useState([])
    return (
      <Paper>
        <Paper.Section>
          <Field
            label="Tags"
            type="text"
            disabled={boolean("Disabled", false)}
            error={boolean("Error", false) ? "Wrong color!" : null}
            component={TagInput}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Paper.Section>
      </Paper>
    )
  })

const OptionsStory = ({ component }) => {
  const [value, setValue] = useState(null)

  const showInfo = boolean("Show info", false)
  const showOptionInfo = boolean("Show option info", false)
  const isMulti = boolean("Multi select", false)

  return (
    <Paper>
      <Paper.Section>
        <Field
          label="Privacy"
          info={showInfo ? "Choose your privacy wisely" : null}
          type="options"
          name="privacy"
          options={[
            {
              value: "PUBLIC",
              label: "Public",
              info: showOptionInfo ? "Option with info" : null
            },
            {
              value: "UNDEFINED",
              label: "I don't know...",
              info: showOptionInfo ? "No info " : null
            },
            {
              value: "PRIVATE",
              label: "Private",
              info: showOptionInfo ? "Option with even more info" : null
            }
          ]}
          component={component}
          isMulti={isMulti}
          value={value}
          onChange={event => setValue(event.target.value)}
          disabled={boolean("Disabled", false)}
          error={boolean("Error", false) ? "Wrong option chosen!" : null}
        />
      </Paper.Section>
    </Paper>
  )
}
storiesOf("Forms.Fields.Options", module)
  .add("Default options", () => <OptionsStory component={DefaultOptions} />)
  .add("Tab options", () => <OptionsStory component={TabOptions} />)
  .add("Select options", () => <OptionsStory component={SelectOptions} />)
  .add("Disguised select options", () => (
    <OptionsStory
      component={props => (
        <DisguisedSelectOptions
          {...props}
          render={props => (
            <Button {...props} color="primary" importance="primary">
              + Add option
            </Button>
          )}
        />
      )}
    />
  ))
