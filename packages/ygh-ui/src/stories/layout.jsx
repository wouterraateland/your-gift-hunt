import React from "react"

import { storiesOf } from "@storybook/react"
import {
  withKnobs,
  number,
  optionsKnob as options
} from "@storybook/addon-knobs"

import withTheme from "./decorators/withTheme"
import withToolTipRoot from "./decorators/withToolTipRoot"

import {
  Align,
  Article,
  Column,
  Clear,
  Float,
  FullHeight,
  Hide,
  Row,
  Section,
  VSpace,
  Wrapper
} from "../"

const C = props => (
  <div
    style={{ backgroundColor: "#f12", color: "#fff", ...props.style }}
    {...props}
  />
)

storiesOf("Layout.Basic", module)
  .addDecorator(withTheme)
  .addDecorator(withToolTipRoot)
  .addDecorator(withKnobs)
  .add("Align", () => (
    <>
      <Align.Left>
        Content left aligned Content left aligned Content left aligned Content
        left aligned Content left aligned Content left aligned Content left
        aligned
      </Align.Left>
      <Align.Right>
        Content right aligned Content right aligned Content right aligned
        Content right aligned Content right aligned Content right aligned
        Content right aligned
      </Align.Right>
      <Align.Center>
        Content center Aligned Content center Aligned Content center Aligned
        Content center Aligned Content center Aligned Content center Aligned
        Content center Aligned
      </Align.Center>
      <Align.Justify>
        Content Justified Content Justified Content Justified Content Justified
        Content Justified Content Justified Content Justified Content Justified
      </Align.Justify>
    </>
  ))
  .add("Article", () => (
    <Article>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
      consequuntur soluta ut assumenda nostrum illo hic, omnis doloremque.
      Eveniet hic possimus consequatur cum voluptates aliquid ea sunt
      accusantium velit iusto.
    </Article>
  ))
  .add("Clear", () => <Clear />)
  .add("Float", () => (
    <>
      <Float.None>Not floating</Float.None>
      <Float.Left>Floating left</Float.Left>
      <Float.Right>Floating right</Float.Right>
    </>
  ))
  .add("FullHeight", () => (
    <FullHeight
      style={{
        backgroundColor: "#f12",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      Full Height content
    </FullHeight>
  ))
  .add("Hide", () => (
    <>
      <Hide.Small>Hidden on Small screens</Hide.Small>
      <Hide.Medium>Hidden on Medium screens</Hide.Medium>
      <Hide.Large>Hidden on Large screens</Hide.Large>
      <Hide.Not.Small>Hidden on Not Small screens</Hide.Not.Small>
      <Hide.Not.Medium>Hidden on Not Medium screens</Hide.Not.Medium>
      <Hide.Not.Large>Hidden on Not Large screens</Hide.Not.Large>
    </>
  ))
  .add("Section", () => <Section />)
  .add("VSpace", () => (
    <>
      <div style={{ backgroundColor: "red" }}>Small (0.5em)</div>
      <VSpace.Small />
      <div style={{ backgroundColor: "red" }}>Small (0.5em)</div>
      <div style={{ backgroundColor: "orange" }}>Medium (1em)</div>
      <VSpace.Medium />
      <div style={{ backgroundColor: "orange" }}>Medium (1em)</div>
      <div style={{ backgroundColor: "yellow" }}>Large (2em)</div>
      <VSpace.Large />
      <div style={{ backgroundColor: "yellow" }}>Large (2em)</div>
      <div style={{ backgroundColor: "green" }}>XLarge (4em)</div>
      <VSpace.XLarge />
      <div style={{ backgroundColor: "green" }}>XLarge (4em)</div>
      <div style={{ backgroundColor: "aquamarine" }}>Variable height</div>
      <VSpace height={number("Variable height", 8)} />
      <div style={{ backgroundColor: "aquamarine" }}>Variable height</div>
    </>
  ))
  .add("Wrapper", () => (
    <>
      <Wrapper.Tiny>
        <C>Tiny (30rem)</C>
      </Wrapper.Tiny>
      <Wrapper.Small>
        <C>Small (45rem)</C>
      </Wrapper.Small>
      <Wrapper.Medium>
        <C>Medium (60rem)</C>
      </Wrapper.Medium>
      <Wrapper.Large>
        <C>Large (75rem)</C>
      </Wrapper.Large>
      <Wrapper width={number("Variable width", 60, { min: 4, max: 120 })}>
        <C>Variable width</C>
      </Wrapper>
    </>
  ))

storiesOf("Layout.Grid", module)
  .addDecorator(withTheme)
  .addDecorator(withToolTipRoot)
  .addDecorator(withKnobs)
  .add("Grid", () => {
    const size = number("Column size", 12, {
      min: 1,
      max: 12,
      step: 1,
      range: true
    })
    const style = { backgroundColor: "#fff", textAlign: "center" }

    return (
      <Row
        align={options(
          "Horizontal align",
          {
            Left: "left",
            Center: "center",
            Right: "right"
          },
          "center",
          { display: "inline-radio" }
        )}
        vAlign={options(
          "Vertical align",
          {
            Top: "top",
            Center: "center",
            Bottom: "bottom"
          },
          "center",
          { display: "inline-radio" }
        )}
      >
        <Column style={style} size={size}>
          <C>
            {size}
            <br />
            {size}
          </C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
        <Column style={style} size={size}>
          <C>{size}</C>
        </Column>
      </Row>
    )
  })
