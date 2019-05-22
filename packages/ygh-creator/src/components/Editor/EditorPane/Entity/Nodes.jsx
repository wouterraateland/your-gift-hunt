import React from "react"
import styled from "styled-components"

const Group = styled.div`
  position: absolute;
  top: 50%;
`

const LeftGroup = styled(Group)`
  left: 0;

  transform: translate(-50%, -50%);
`

const RightGroup = styled(Group)`
  right: 0;

  transform: translate(50%, -50%);
`

const Node = styled.div`
  display: none;
  width: 1em;
  height: 1em;
  margin: 0.5em;
  border-radius: 100%;
  box-shadow: ${props => props.theme.boxShadow.small};

  background-color: #fff;
`

const Nodes = ({ entity }) => (
  <>
    <LeftGroup>
      {entity.entrances.map(entrance => (
        <Node key={entrance.id} />
      ))}
    </LeftGroup>
    <RightGroup>
      {entity.portals.map(portal => (
        <Node key={portal.id} />
      ))}
    </RightGroup>
    <LeftGroup>
      {entity.fields
        .filter(({ isSecret }) => isSecret)
        .map(field => (
          <Node key={field.id} />
        ))}
    </LeftGroup>
    <RightGroup>
      {entity.informationSlots.map(informationSlot => (
        <Node key={informationSlot.id} />
      ))}
    </RightGroup>
  </>
)

export default Nodes
