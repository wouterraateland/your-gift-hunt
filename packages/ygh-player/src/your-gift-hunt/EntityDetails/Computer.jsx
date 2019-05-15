import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import styled, { keyframes } from "styled-components"

import _ from "utils"
import { Entity } from "../Entities"

const turnOn = keyframes`
  to { background-color: #030739; }
`

const ComputerScreen = styled(Entity)`
  padding: 1em;
  border: 0.5em solid #eee;
  border-width: 1em 0.5em 2em 0.5em;
  border-radius: 0.5em;

  box-shadow: 0.4em 0.4em 2.4em -0.2em #0004;

  font-family: monospace;
  color: #fff;
  background-color: #111;

  animation: ${turnOn} 0.5s ease-out 0.4s forwards;

  &::before,
  &::after {
    content: "";

    position: absolute;
    left: 50%;
    top: 100%;
    z-index: -1;
  }

  &::before {
    width: 6em;
    height: 4em;
    border-radius: 1em 1em 0.25em 0.25em / 3.5em 3.5em 0.25em 0.25em;
    box-shadow: 0.4em 0.4em 2.4em -0.2em #0004;

    background-image: linear-gradient(
      #ccc,
      #eee 3.25em,
      #ccc 3.5em,
      #eee 3.75em,
      #aaa 4em
    );

    transform: translate(-50%, 1.5em);
  }

  &::after {
    width: 3em;
    height: 3em;
    border-radius: 100%;

    box-shadow: inset 0.4em 0.4em 2.4em -0.2em #0004;

    transform: translate(-50%, 1em);
  }

  label {
    display: block;
  }
`

const AnswerInput = styled.input`
  opacity: 0;
  position: absolute;
`

const blink = keyframes`
  from { color: #fff0; }
  50% { color: #fff; }
`

const Cursor = styled.span`
  display: inline-block;
  height: 1em;
  border-bottom: 0.1em solid;

  color: #fff0;

  input:focus ~ & {
    width: 1ch;
    animation: ${blink} 1s infinite step-end;
  }
`

const Nav = styled.div`
  position: absolute;
  left: 1ch;
  bottom: 1em;

  & span {
    cursor: pointer;
  }
`

const PromptText = styled.span`
  color: #ff0;
`
const AnswerMarker = styled.span`
  color: #0ff;
`
const SuccessMarker = styled.span`
  color: #0f0;
`
const ErrorMarker = styled.span`
  color: #f00;
`

const Prompt = ({ text, children }) => {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    setDisplay("")
    const i = setInterval(() => {
      setDisplay(display => {
        if (display.length === text.length) {
          clearInterval(i)
        }
        return text.substr(0, display.length + 1)
      })
    }, 50)
    return () => {
      clearInterval(i)
    }
  }, [text])

  return (
    <>
      <PromptText>{display}</PromptText>
      {display.length === text.length && children}
    </>
  )
}

const Computer = forwardRef(
  ({ containedEntities, dispatchInputAction, ...props }, ref) => {
    const input = useRef(null)
    const [entityIndex, setEntityIndex] = useState(-1)
    const [answer, setAnswer] = useState("")

    const entity = entityIndex === -1 ? null : containedEntities[entityIndex]

    useEffect(() => {
      input.current && input.current.focus()
    }, [])

    const handleOnSubmit = useCallback(
      event => {
        event.preventDefault()
        dispatchInputAction(entity.state, "answer", answer)
      },
      [dispatchInputAction, entity, answer]
    )

    const goToEntity = useCallback(index => {
      setAnswer("")
      setEntityIndex(index)
    }, [])

    const isAnswered = _.or(_.hasState("answered"), _.hasState("filled"))(
      entity
    )
    const isUnanswered = _.or(_.hasState("unanswered"), _.hasState("empty"))(
      entity
    )

    return (
      <ComputerScreen ref={ref} {...props}>
        <form onSubmit={handleOnSubmit}>
          <label>
            {isUnanswered && (
              <AnswerInput
                ref={input}
                onKeyPress={event =>
                  event.keyCode === 13 ? handleOnSubmit(event) : true
                }
                onChange={event => setAnswer(event.target.value)}
                value={answer}
              />
            )}
            <Prompt
              text={
                entity === null
                  ? containedEntities.some(
                      _.or(_.hasState("unanswered"), _.hasState("empty"))
                    )
                    ? "New questions available."
                    : "No new questions available."
                  : _.getFieldValue("Question")(entity) ||
                    _.getFieldValue("Prompt")(entity)
              }
            >
              <br />
              <br />
              {entity === null ? (
                containedEntities.length > 0 ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const firstUnreadIndex = containedEntities.findIndex(
                        _.or(_.hasState("unanswered"), _.hasState("empty"))
                      )

                      goToEntity(
                        firstUnreadIndex === -1 && containedEntities.length
                          ? 0
                          : firstUnreadIndex
                      )
                    }}
                  >
                    {containedEntities.some(
                      _.or(_.hasState("unanswered"), _.hasState("empty"))
                    )
                      ? "Show question"
                      : "Show first question"}
                  </span>
                ) : null
              ) : (
                <>
                  <AnswerMarker>&gt;</AnswerMarker>{" "}
                  {isAnswered ? _.getInputValue("answer")(entity) : answer}
                  {isUnanswered && <Cursor />}{" "}
                  {isAnswered && <SuccessMarker>✓</SuccessMarker>}
                  {isUnanswered &&
                    _.getInputValue("answer")(entity) === answer && (
                      <ErrorMarker>×</ErrorMarker>
                    )}
                  <Nav>
                    <span onClick={() => goToEntity(entityIndex - 1)}>◀</span>
                    {"  "}
                    {entityIndex < containedEntities.length - 1 && (
                      <span onClick={() => goToEntity(entityIndex + 1)}>▶</span>
                    )}
                  </Nav>
                </>
              )}
            </Prompt>
          </label>
        </form>
      </ComputerScreen>
    )
  }
)
Computer.name = "Computer"
Computer.templateName = "Computer screen"
Computer.defaultProps = {
  ...Entity.defaultProps,
  width: 24,
  height: 13.5
}

export default Computer
