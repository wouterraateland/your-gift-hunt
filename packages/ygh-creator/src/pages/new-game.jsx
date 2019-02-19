import React, { useMemo, useContext } from "react"
import styled from "styled-components"
import randomstring from "randomstring"

import { useFormState } from "react-use-form-state"
import { useQuery } from "react-apollo-hooks"

import AuthContext from "contexts/Auth"

import Layout from "layouts/Overview"
import {
  Wrapper,
  Paper,
  Float,
  Clear,
  Field,
  Input,
  Select,
  Button
} from "your-gift-hunt/ui"
import Present from "components/Present"
import BackButton from "components/BackButton"

import { USER } from "gql/queries"
import { ACCESS_TYPES, PRIVACY, accessOptions, nameOptions } from "../data"

const CornerDecoration = styled(Float.Right)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: -1em;
    top: -1em;

    width: 20em;
    height: 11em;
    border-style: solid;
    border-width: 5.5em 10em;
    border-color: #0001 #0001 transparent transparent;
  }

  & svg {
    position: relative;
    z-index: 1;
  }
`

const Title = styled.h1`
  margin-bottom: 0;
`

const Tagline = styled.p`
  margin-top: 0;
`

const Form = styled.form`
  padding: 0 1em;
`

const Slash = styled.span`
  margin: 0 1em;

  font-weight: bold;
  vertical-align: middle;
`

const NewGamePage = () => {
  const { user } = useContext(AuthContext)
  const { data, error } = useQuery(USER, {
    variables: {
      userId: user.user_metadata.prismaUserId
    }
  })
  if (error) {
    throw new Error(error)
  }
  const userSlug = data.user.slug
  const exampleName = useMemo(
    () =>
      `${
        nameOptions.first[Math.floor(Math.random() * nameOptions.first.length)]
      } ${
        nameOptions.last[Math.floor(Math.random() * nameOptions.last.length)]
      }`,
    []
  )

  const [formState, { text, radio, select }] = useFormState({
    access_type: ACCESS_TYPES.CODE,
    access_code: randomstring.generate(10)
  })
  const accessCodeProps = text("access_code")

  function onSubmit(event) {
    event.preventDefault()

    console.log(formState)
  }

  function onGenerateClick() {
    accessCodeProps.onChange({ target: { value: randomstring.generate(10) } })
  }

  return (
    <Layout title="New hunt">
      <Wrapper size="large">
        <Paper>
          <Paper.Section>
            <Float.Left>
              <BackButton />
            </Float.Left>
            <CornerDecoration>
              <Present
                style={{ height: "7em", marginRight: "2em", marginTop: "-2em" }}
                boxColor="#49e"
              />
            </CornerDecoration>
            <Clear.Both style={{ marginBottom: "-3.25em" }} />
            <Title>Create a new hunt</Title>
            <Tagline>Lets get you up and running.</Tagline>
            <Form onSubmit={onSubmit}>
              <Field block>
                <Input label="Owner" value={userSlug} disabled />
                <Slash>/</Slash>
                <Input {...text("name")} required label="Hunt name" />
              </Field>
              <small>
                A good hunt name is short and descriptive. Need some
                inspiration? How about <strong>{exampleName}</strong>?
              </small>
              <br />
              <br />
              <Field block>
                <Input
                  block
                  {...text("description")}
                  label="Description"
                  info="optional"
                />
              </Field>
              <hr />
              <Field block>
                <Input
                  block
                  {...radio("privacy", PRIVACY.PUBLIC)}
                  required
                  label="Public"
                  info="Anyone can see and play this hunt. You cannot use friend based puzzles."
                />
                <Input
                  block
                  {...radio("privacy", PRIVACY.PRIVATE)}
                  required
                  label="Private"
                  info="A hunt made for one player. You can include friend based puzzles."
                />
              </Field>
              {formState.values.privacy === PRIVACY.PRIVATE && (
                <>
                  <Field block>
                    <Select
                      {...select("access_type")}
                      options={accessOptions}
                      label="Protection type"
                      info=""
                    />
                  </Field>
                  {formState.values.access_type === ACCESS_TYPES.CODE && (
                    <>
                      <Field block>
                        <Input block {...accessCodeProps} label="Access code" />
                      </Field>
                      <small>
                        Chose a word or sentence that is significant to the
                        player. Or generate a{" "}
                        <u
                          style={{ cursor: "pointer" }}
                          onClick={onGenerateClick}
                        >
                          new random code
                        </u>
                        .
                      </small>
                    </>
                  )}
                </>
              )}
              <hr />
              <Field block>
                <Button type="submit" importance="primary" color="accent">
                  Create
                </Button>
              </Field>
            </Form>
          </Paper.Section>
        </Paper>
      </Wrapper>
    </Layout>
  )
}

export default NewGamePage
