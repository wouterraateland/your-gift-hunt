import React from "react"
import styled from "styled-components"
import GenericItem from "your-gift-hunt/items"
import GenericObject, { getObjectComponent } from "your-gift-hunt/objects"

import S from "sanctuary"

const Card = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 12em;
  height: 6em;
  padding: 0.5em;
  border: 0.1em solid #0004;

  background: #fff;
`

const InstanceName = styled.h2`
  margin: 0 4rem 0.25rem 0;
  font-size: 1.25em;
  line-height: 1;
`

const InstanceState = styled.p`
  margin: 0;

  opacity: 0.7;

  font-size: 0.7em;
  text-transform: uppercase;
  font-weight: bold;
`

const FeaturedFieldValue = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;

  margin: 0.5em 3rem 0 0;
  max-height: 3em;

  font-size: 0.8em;
`

const EntityPreview = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 4em;
  height: 4em;
  border-width: 0.6em 0.6em 1.4em 1.4em;
  border-style: solid;
  border-color: transparent;
  border-bottom-left-radius: 100%;

  background: #ddd;
`

const Scaled = ({ isRotated, scale, ...otherProps }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `
      translate(-50%, -50%)
      rotate(${isRotated ? 45 : 0}deg)
      scale(${scale})`
    }}
    {...otherProps}
  />
)

const InstanceCard = ({ instance, position, onClick }) => {
  const { state, entity, fields } = instance
  const scale = entity.isObject
    ? S.pipe([
        S.map(({ width, height }) => 2.5 / Math.max(width, height)),
        S.maybe(1)(x => x)
      ])(getObjectComponent(entity.name))
    : entity.isItem
    ? 1.5
    : 1

  return (
    <Card onClick={onClick} style={position}>
      <InstanceName>{entity.name}</InstanceName>
      {state !== "default" && <InstanceState>{state}</InstanceState>}
      {entity.featuredField && (
        <FeaturedFieldValue>
          {JSON.parse(
            fields.find(({ field }) => field.id === entity.featuredField.id)
              .value
          )}
        </FeaturedFieldValue>
      )}
      {entity && (
        <EntityPreview>
          <Scaled scale={scale} isRotated={entity.isObject}>
            {entity.isItem && <GenericItem {...instance} />}
            {entity.isObject && <GenericObject {...instance} />}
          </Scaled>
        </EntityPreview>
      )}
    </Card>
  )
}

export default InstanceCard
