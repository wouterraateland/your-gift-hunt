import prisma_lib from "prisma-client-lib"
import { typeDefs } from "./prisma-schema"

var models = [
  {
    name: "Action",
    embedded: false
  },
  {
    name: "ActionPayload",
    embedded: false
  },
  {
    name: "ActionPayloadInputValue",
    embedded: false
  },
  {
    name: "ActionRequirement",
    embedded: false
  },
  {
    name: "ActionRequirementPayload",
    embedded: false
  },
  {
    name: "ActionRequirementPayloadEntity",
    embedded: false
  },
  {
    name: "ActionRequirementPayloadInputValue",
    embedded: false
  },
  {
    name: "ActionType",
    embedded: false
  },
  {
    name: "Entity",
    embedded: false
  },
  {
    name: "EntityField",
    embedded: false
  },
  {
    name: "EntityInstance",
    embedded: false
  },
  {
    name: "EntityInstanceField",
    embedded: false
  },
  {
    name: "EntityInstanceState",
    embedded: false
  },
  {
    name: "EntityInstanceStateTransition",
    embedded: false
  },
  {
    name: "EntityState",
    embedded: false
  },
  {
    name: "EntityStateTransition",
    embedded: false
  },
  {
    name: "FieldType",
    embedded: false
  },
  {
    name: "Game",
    embedded: false
  },
  {
    name: "GamePlay",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
]

export const Prisma = prisma_lib.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://hunt-api-e7bdecad20.herokuapp.com/hunt-api/dev`
})

export const prisma = new Prisma()
