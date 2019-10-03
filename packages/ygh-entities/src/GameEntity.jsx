import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  width: 100%;
  height: 100%;
  padding: 2rem;

  &::before {
    content: "";

    position: absolute;
    top: -1rem;
    left: -1rem;
    bottom: -1rem;
    right: -1rem;

    background: #000 url(${props => props.backgroundImage}) no-repeat center /
      cover;

    transition: filter 0.5s ease-in-out;

    ${props =>
      props.shouldBlur &&
      css`
        filter: blur(1rem);
      `}
  }

  &::after {
    content: "";

    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    height: 7rem;

    background: ${props =>
      props.shouldDarken
        ? `linear-gradient(transparent, #0009)`
        : `linear-gradient(transparent, transparent)`};
  }
`

const Text = styled.p`
  position: relative;
  z-index: 1;

  border-radius: 0.5rem;
  padding: 2rem;
  margin: 1rem 0;

  background-color: #fff9;
  backdrop-filter: blur(1rem);
`

const ActionContainer = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  height: 3rem;
  margin: 0 -0.5rem;

  text-align: center;
`

const Label = styled.span`
  color: #fff;
`

const Input = styled.input`
  flex-grow: 1;
  height: 3rem;
  padding: 0.75rem 0.5rem;
  margin: 0 0.5rem;
  border-radius: 1.5rem;

  line-height: 1.5rem;

  background-color: #fff9;
  backdrop-filter: blur(1rem);
`

const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: 3rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 100%;

  text-align: center;

  background-color: #08f;
  color: #fff;
`

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  height: 3rem;
  padding: 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 0.5rem;

  line-height: 1rem;

  color: #08f;
  background-color: #fff9;
  backdrop-filter: blur(1rem);
`

const Action = ({ action, act, disabled }) => {
  const ref = useRef(null)

  const onSubmit = useCallback(() => {
    if (ref.current.value) {
      act(ref.current.value)
    }
  }, [act])

  const onKeyPress = useCallback(
    event => {
      if (event.key === "Enter") {
        onSubmit()
      }
    },
    [onSubmit]
  )

  if (!action) {
    return null
  }

  switch (action.type) {
    case "click":
      return <Label>{action.label}</Label>
    case "input":
      return (
        <>
          <Input
            ref={ref}
            disabled={disabled}
            {...action.input}
            onKeyPress={onKeyPress}
          />
          <ConfirmButton disabled={disabled} onClick={onSubmit}>
            &rarr;
          </ConfirmButton>
        </>
      )
    case "options":
      return action.options.map(option => (
        <OptionButton
          key={option}
          disabled={disabled}
          onClick={() => act(option)}
        >
          {option}
        </OptionButton>
      ))
    default:
      return null
  }
}

const GameEntity = forwardRef(
  (
    { backgroundImage, text, action, act, shouldBlur, children, ...otherProps },
    ref
  ) => {
    const [bgImage, setBgImage] = useState(null)

    useEffect(() => {
      const onLoad = () => setBgImage(backgroundImage)

      const img = new Image()
      img.addEventListener("load", onLoad)
      img.src = backgroundImage

      return () => img.removeEventListener("load", onLoad)
    }, [backgroundImage])

    return (
      <Container
        ref={ref}
        backgroundImage={bgImage}
        onClick={action && action.type === "click" ? () => act() : null}
        shouldBlur={shouldBlur}
        shouldDarken={action && action.type === "click" && action.label}
      >
        {text && <Text>{text}</Text>}
        <ActionContainer type={action ? action.type : null}>
          <Action action={action} act={act} {...otherProps} />
        </ActionContainer>
        {children}
      </Container>
    )
  }
)

export default GameEntity
