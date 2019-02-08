export const typeDefs = /* GraphQL */ `type Action {
  id: ID!
  createdAt: DateTime!
  type: ActionType!
  payload: ActionPayload!
  gamePlay: GamePlay!
}

type ActionConnection {
  pageInfo: PageInfo!
  edges: [ActionEdge]!
  aggregate: AggregateAction!
}

input ActionCreateInput {
  type: ActionType!
  payload: ActionPayloadCreateOneWithoutActionInput!
  gamePlay: GamePlayCreateOneWithoutActionsInput!
}

input ActionCreateManyWithoutGamePlayInput {
  create: [ActionCreateWithoutGamePlayInput!]
  connect: [ActionWhereUniqueInput!]
}

input ActionCreateOneWithoutPayloadInput {
  create: ActionCreateWithoutPayloadInput
  connect: ActionWhereUniqueInput
}

input ActionCreateWithoutGamePlayInput {
  type: ActionType!
  payload: ActionPayloadCreateOneWithoutActionInput!
}

input ActionCreateWithoutPayloadInput {
  type: ActionType!
  gamePlay: GamePlayCreateOneWithoutActionsInput!
}

type ActionEdge {
  node: Action!
  cursor: String!
}

enum ActionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionPayload {
  id: ID!
  instance: EntityInstance
  state: EntityState
  item: EntityInstance
  inputValues(where: ActionPayloadInputValueWhereInput, orderBy: ActionPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionPayloadInputValue!]
  action: Action
}

type ActionPayloadConnection {
  pageInfo: PageInfo!
  edges: [ActionPayloadEdge]!
  aggregate: AggregateActionPayload!
}

input ActionPayloadCreateInput {
  instance: EntityInstanceCreateOneInput
  state: EntityStateCreateOneInput
  item: EntityInstanceCreateOneInput
  inputValues: ActionPayloadInputValueCreateManyInput
  action: ActionCreateOneWithoutPayloadInput
}

input ActionPayloadCreateOneWithoutActionInput {
  create: ActionPayloadCreateWithoutActionInput
  connect: ActionPayloadWhereUniqueInput
}

input ActionPayloadCreateWithoutActionInput {
  instance: EntityInstanceCreateOneInput
  state: EntityStateCreateOneInput
  item: EntityInstanceCreateOneInput
  inputValues: ActionPayloadInputValueCreateManyInput
}

type ActionPayloadEdge {
  node: ActionPayload!
  cursor: String!
}

type ActionPayloadInputValue {
  id: ID!
  key: String!
  value: String
}

type ActionPayloadInputValueConnection {
  pageInfo: PageInfo!
  edges: [ActionPayloadInputValueEdge]!
  aggregate: AggregateActionPayloadInputValue!
}

input ActionPayloadInputValueCreateInput {
  key: String!
  value: String
}

input ActionPayloadInputValueCreateManyInput {
  create: [ActionPayloadInputValueCreateInput!]
  connect: [ActionPayloadInputValueWhereUniqueInput!]
}

type ActionPayloadInputValueEdge {
  node: ActionPayloadInputValue!
  cursor: String!
}

enum ActionPayloadInputValueOrderByInput {
  id_ASC
  id_DESC
  key_ASC
  key_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionPayloadInputValuePreviousValues {
  id: ID!
  key: String!
  value: String
}

input ActionPayloadInputValueScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [ActionPayloadInputValueScalarWhereInput!]
  OR: [ActionPayloadInputValueScalarWhereInput!]
  NOT: [ActionPayloadInputValueScalarWhereInput!]
}

type ActionPayloadInputValueSubscriptionPayload {
  mutation: MutationType!
  node: ActionPayloadInputValue
  updatedFields: [String!]
  previousValues: ActionPayloadInputValuePreviousValues
}

input ActionPayloadInputValueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionPayloadInputValueWhereInput
  AND: [ActionPayloadInputValueSubscriptionWhereInput!]
  OR: [ActionPayloadInputValueSubscriptionWhereInput!]
  NOT: [ActionPayloadInputValueSubscriptionWhereInput!]
}

input ActionPayloadInputValueUpdateDataInput {
  key: String
  value: String
}

input ActionPayloadInputValueUpdateInput {
  key: String
  value: String
}

input ActionPayloadInputValueUpdateManyDataInput {
  key: String
  value: String
}

input ActionPayloadInputValueUpdateManyInput {
  create: [ActionPayloadInputValueCreateInput!]
  update: [ActionPayloadInputValueUpdateWithWhereUniqueNestedInput!]
  upsert: [ActionPayloadInputValueUpsertWithWhereUniqueNestedInput!]
  delete: [ActionPayloadInputValueWhereUniqueInput!]
  connect: [ActionPayloadInputValueWhereUniqueInput!]
  disconnect: [ActionPayloadInputValueWhereUniqueInput!]
  deleteMany: [ActionPayloadInputValueScalarWhereInput!]
  updateMany: [ActionPayloadInputValueUpdateManyWithWhereNestedInput!]
}

input ActionPayloadInputValueUpdateManyMutationInput {
  key: String
  value: String
}

input ActionPayloadInputValueUpdateManyWithWhereNestedInput {
  where: ActionPayloadInputValueScalarWhereInput!
  data: ActionPayloadInputValueUpdateManyDataInput!
}

input ActionPayloadInputValueUpdateWithWhereUniqueNestedInput {
  where: ActionPayloadInputValueWhereUniqueInput!
  data: ActionPayloadInputValueUpdateDataInput!
}

input ActionPayloadInputValueUpsertWithWhereUniqueNestedInput {
  where: ActionPayloadInputValueWhereUniqueInput!
  update: ActionPayloadInputValueUpdateDataInput!
  create: ActionPayloadInputValueCreateInput!
}

input ActionPayloadInputValueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [ActionPayloadInputValueWhereInput!]
  OR: [ActionPayloadInputValueWhereInput!]
  NOT: [ActionPayloadInputValueWhereInput!]
}

input ActionPayloadInputValueWhereUniqueInput {
  id: ID
}

enum ActionPayloadOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionPayloadPreviousValues {
  id: ID!
}

type ActionPayloadSubscriptionPayload {
  mutation: MutationType!
  node: ActionPayload
  updatedFields: [String!]
  previousValues: ActionPayloadPreviousValues
}

input ActionPayloadSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionPayloadWhereInput
  AND: [ActionPayloadSubscriptionWhereInput!]
  OR: [ActionPayloadSubscriptionWhereInput!]
  NOT: [ActionPayloadSubscriptionWhereInput!]
}

input ActionPayloadUpdateInput {
  instance: EntityInstanceUpdateOneInput
  state: EntityStateUpdateOneInput
  item: EntityInstanceUpdateOneInput
  inputValues: ActionPayloadInputValueUpdateManyInput
  action: ActionUpdateOneWithoutPayloadInput
}

input ActionPayloadUpdateOneRequiredWithoutActionInput {
  create: ActionPayloadCreateWithoutActionInput
  update: ActionPayloadUpdateWithoutActionDataInput
  upsert: ActionPayloadUpsertWithoutActionInput
  connect: ActionPayloadWhereUniqueInput
}

input ActionPayloadUpdateWithoutActionDataInput {
  instance: EntityInstanceUpdateOneInput
  state: EntityStateUpdateOneInput
  item: EntityInstanceUpdateOneInput
  inputValues: ActionPayloadInputValueUpdateManyInput
}

input ActionPayloadUpsertWithoutActionInput {
  update: ActionPayloadUpdateWithoutActionDataInput!
  create: ActionPayloadCreateWithoutActionInput!
}

input ActionPayloadWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  instance: EntityInstanceWhereInput
  state: EntityStateWhereInput
  item: EntityInstanceWhereInput
  inputValues_every: ActionPayloadInputValueWhereInput
  inputValues_some: ActionPayloadInputValueWhereInput
  inputValues_none: ActionPayloadInputValueWhereInput
  action: ActionWhereInput
  AND: [ActionPayloadWhereInput!]
  OR: [ActionPayloadWhereInput!]
  NOT: [ActionPayloadWhereInput!]
}

input ActionPayloadWhereUniqueInput {
  id: ID
}

type ActionPreviousValues {
  id: ID!
  createdAt: DateTime!
  type: ActionType!
}

type ActionRequirement {
  id: ID!
  type: ActionType!
  hints: [String!]!
  payload: ActionRequirementPayload!
}

type ActionRequirementConnection {
  pageInfo: PageInfo!
  edges: [ActionRequirementEdge]!
  aggregate: AggregateActionRequirement!
}

input ActionRequirementCreatehintsInput {
  set: [String!]
}

input ActionRequirementCreateInput {
  type: ActionType
  hints: ActionRequirementCreatehintsInput
  payload: ActionRequirementPayloadCreateOneWithoutActionRequirementInput!
}

input ActionRequirementCreateManyInput {
  create: [ActionRequirementCreateInput!]
  connect: [ActionRequirementWhereUniqueInput!]
}

input ActionRequirementCreateOneWithoutPayloadInput {
  create: ActionRequirementCreateWithoutPayloadInput
  connect: ActionRequirementWhereUniqueInput
}

input ActionRequirementCreateWithoutPayloadInput {
  type: ActionType
  hints: ActionRequirementCreatehintsInput
}

type ActionRequirementEdge {
  node: ActionRequirement!
  cursor: String!
}

enum ActionRequirementOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionRequirementPayload {
  id: ID!
  requiredEntity: ActionRequirementPayloadEntity
  requiredValues(where: ActionRequirementPayloadInputValueWhereInput, orderBy: ActionRequirementPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirementPayloadInputValue!]
  actionRequirement: ActionRequirement!
}

type ActionRequirementPayloadConnection {
  pageInfo: PageInfo!
  edges: [ActionRequirementPayloadEdge]!
  aggregate: AggregateActionRequirementPayload!
}

input ActionRequirementPayloadCreateInput {
  requiredEntity: ActionRequirementPayloadEntityCreateOneWithoutPayloadInput
  requiredValues: ActionRequirementPayloadInputValueCreateManyWithoutPayloadInput
  actionRequirement: ActionRequirementCreateOneWithoutPayloadInput!
}

input ActionRequirementPayloadCreateOneWithoutActionRequirementInput {
  create: ActionRequirementPayloadCreateWithoutActionRequirementInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadCreateOneWithoutRequiredEntityInput {
  create: ActionRequirementPayloadCreateWithoutRequiredEntityInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadCreateOneWithoutRequiredValuesInput {
  create: ActionRequirementPayloadCreateWithoutRequiredValuesInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadCreateWithoutActionRequirementInput {
  requiredEntity: ActionRequirementPayloadEntityCreateOneWithoutPayloadInput
  requiredValues: ActionRequirementPayloadInputValueCreateManyWithoutPayloadInput
}

input ActionRequirementPayloadCreateWithoutRequiredEntityInput {
  requiredValues: ActionRequirementPayloadInputValueCreateManyWithoutPayloadInput
  actionRequirement: ActionRequirementCreateOneWithoutPayloadInput!
}

input ActionRequirementPayloadCreateWithoutRequiredValuesInput {
  requiredEntity: ActionRequirementPayloadEntityCreateOneWithoutPayloadInput
  actionRequirement: ActionRequirementCreateOneWithoutPayloadInput!
}

type ActionRequirementPayloadEdge {
  node: ActionRequirementPayload!
  cursor: String!
}

type ActionRequirementPayloadEntity {
  id: ID!
  entity: Entity!
  state: EntityState!
  payload: ActionRequirementPayload!
}

type ActionRequirementPayloadEntityConnection {
  pageInfo: PageInfo!
  edges: [ActionRequirementPayloadEntityEdge]!
  aggregate: AggregateActionRequirementPayloadEntity!
}

input ActionRequirementPayloadEntityCreateInput {
  entity: EntityCreateOneInput!
  state: EntityStateCreateOneInput!
  payload: ActionRequirementPayloadCreateOneWithoutRequiredEntityInput!
}

input ActionRequirementPayloadEntityCreateOneWithoutPayloadInput {
  create: ActionRequirementPayloadEntityCreateWithoutPayloadInput
  connect: ActionRequirementPayloadEntityWhereUniqueInput
}

input ActionRequirementPayloadEntityCreateWithoutPayloadInput {
  entity: EntityCreateOneInput!
  state: EntityStateCreateOneInput!
}

type ActionRequirementPayloadEntityEdge {
  node: ActionRequirementPayloadEntity!
  cursor: String!
}

enum ActionRequirementPayloadEntityOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionRequirementPayloadEntityPreviousValues {
  id: ID!
}

type ActionRequirementPayloadEntitySubscriptionPayload {
  mutation: MutationType!
  node: ActionRequirementPayloadEntity
  updatedFields: [String!]
  previousValues: ActionRequirementPayloadEntityPreviousValues
}

input ActionRequirementPayloadEntitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionRequirementPayloadEntityWhereInput
  AND: [ActionRequirementPayloadEntitySubscriptionWhereInput!]
  OR: [ActionRequirementPayloadEntitySubscriptionWhereInput!]
  NOT: [ActionRequirementPayloadEntitySubscriptionWhereInput!]
}

input ActionRequirementPayloadEntityUpdateInput {
  entity: EntityUpdateOneRequiredInput
  state: EntityStateUpdateOneRequiredInput
  payload: ActionRequirementPayloadUpdateOneRequiredWithoutRequiredEntityInput
}

input ActionRequirementPayloadEntityUpdateOneWithoutPayloadInput {
  create: ActionRequirementPayloadEntityCreateWithoutPayloadInput
  update: ActionRequirementPayloadEntityUpdateWithoutPayloadDataInput
  upsert: ActionRequirementPayloadEntityUpsertWithoutPayloadInput
  delete: Boolean
  disconnect: Boolean
  connect: ActionRequirementPayloadEntityWhereUniqueInput
}

input ActionRequirementPayloadEntityUpdateWithoutPayloadDataInput {
  entity: EntityUpdateOneRequiredInput
  state: EntityStateUpdateOneRequiredInput
}

input ActionRequirementPayloadEntityUpsertWithoutPayloadInput {
  update: ActionRequirementPayloadEntityUpdateWithoutPayloadDataInput!
  create: ActionRequirementPayloadEntityCreateWithoutPayloadInput!
}

input ActionRequirementPayloadEntityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  entity: EntityWhereInput
  state: EntityStateWhereInput
  payload: ActionRequirementPayloadWhereInput
  AND: [ActionRequirementPayloadEntityWhereInput!]
  OR: [ActionRequirementPayloadEntityWhereInput!]
  NOT: [ActionRequirementPayloadEntityWhereInput!]
}

input ActionRequirementPayloadEntityWhereUniqueInput {
  id: ID
}

type ActionRequirementPayloadInputValue {
  id: ID!
  key: String!
  eqField: EntityField
  neqField: EntityField
  eqValue: String
  neqValue: String
  payload: ActionRequirementPayload!
}

type ActionRequirementPayloadInputValueConnection {
  pageInfo: PageInfo!
  edges: [ActionRequirementPayloadInputValueEdge]!
  aggregate: AggregateActionRequirementPayloadInputValue!
}

input ActionRequirementPayloadInputValueCreateInput {
  key: String!
  eqField: EntityFieldCreateOneInput
  neqField: EntityFieldCreateOneInput
  eqValue: String
  neqValue: String
  payload: ActionRequirementPayloadCreateOneWithoutRequiredValuesInput!
}

input ActionRequirementPayloadInputValueCreateManyWithoutPayloadInput {
  create: [ActionRequirementPayloadInputValueCreateWithoutPayloadInput!]
  connect: [ActionRequirementPayloadInputValueWhereUniqueInput!]
}

input ActionRequirementPayloadInputValueCreateWithoutPayloadInput {
  key: String!
  eqField: EntityFieldCreateOneInput
  neqField: EntityFieldCreateOneInput
  eqValue: String
  neqValue: String
}

type ActionRequirementPayloadInputValueEdge {
  node: ActionRequirementPayloadInputValue!
  cursor: String!
}

enum ActionRequirementPayloadInputValueOrderByInput {
  id_ASC
  id_DESC
  key_ASC
  key_DESC
  eqValue_ASC
  eqValue_DESC
  neqValue_ASC
  neqValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionRequirementPayloadInputValuePreviousValues {
  id: ID!
  key: String!
  eqValue: String
  neqValue: String
}

input ActionRequirementPayloadInputValueScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  eqValue: String
  eqValue_not: String
  eqValue_in: [String!]
  eqValue_not_in: [String!]
  eqValue_lt: String
  eqValue_lte: String
  eqValue_gt: String
  eqValue_gte: String
  eqValue_contains: String
  eqValue_not_contains: String
  eqValue_starts_with: String
  eqValue_not_starts_with: String
  eqValue_ends_with: String
  eqValue_not_ends_with: String
  neqValue: String
  neqValue_not: String
  neqValue_in: [String!]
  neqValue_not_in: [String!]
  neqValue_lt: String
  neqValue_lte: String
  neqValue_gt: String
  neqValue_gte: String
  neqValue_contains: String
  neqValue_not_contains: String
  neqValue_starts_with: String
  neqValue_not_starts_with: String
  neqValue_ends_with: String
  neqValue_not_ends_with: String
  AND: [ActionRequirementPayloadInputValueScalarWhereInput!]
  OR: [ActionRequirementPayloadInputValueScalarWhereInput!]
  NOT: [ActionRequirementPayloadInputValueScalarWhereInput!]
}

type ActionRequirementPayloadInputValueSubscriptionPayload {
  mutation: MutationType!
  node: ActionRequirementPayloadInputValue
  updatedFields: [String!]
  previousValues: ActionRequirementPayloadInputValuePreviousValues
}

input ActionRequirementPayloadInputValueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionRequirementPayloadInputValueWhereInput
  AND: [ActionRequirementPayloadInputValueSubscriptionWhereInput!]
  OR: [ActionRequirementPayloadInputValueSubscriptionWhereInput!]
  NOT: [ActionRequirementPayloadInputValueSubscriptionWhereInput!]
}

input ActionRequirementPayloadInputValueUpdateInput {
  key: String
  eqField: EntityFieldUpdateOneInput
  neqField: EntityFieldUpdateOneInput
  eqValue: String
  neqValue: String
  payload: ActionRequirementPayloadUpdateOneRequiredWithoutRequiredValuesInput
}

input ActionRequirementPayloadInputValueUpdateManyDataInput {
  key: String
  eqValue: String
  neqValue: String
}

input ActionRequirementPayloadInputValueUpdateManyMutationInput {
  key: String
  eqValue: String
  neqValue: String
}

input ActionRequirementPayloadInputValueUpdateManyWithoutPayloadInput {
  create: [ActionRequirementPayloadInputValueCreateWithoutPayloadInput!]
  delete: [ActionRequirementPayloadInputValueWhereUniqueInput!]
  connect: [ActionRequirementPayloadInputValueWhereUniqueInput!]
  disconnect: [ActionRequirementPayloadInputValueWhereUniqueInput!]
  update: [ActionRequirementPayloadInputValueUpdateWithWhereUniqueWithoutPayloadInput!]
  upsert: [ActionRequirementPayloadInputValueUpsertWithWhereUniqueWithoutPayloadInput!]
  deleteMany: [ActionRequirementPayloadInputValueScalarWhereInput!]
  updateMany: [ActionRequirementPayloadInputValueUpdateManyWithWhereNestedInput!]
}

input ActionRequirementPayloadInputValueUpdateManyWithWhereNestedInput {
  where: ActionRequirementPayloadInputValueScalarWhereInput!
  data: ActionRequirementPayloadInputValueUpdateManyDataInput!
}

input ActionRequirementPayloadInputValueUpdateWithoutPayloadDataInput {
  key: String
  eqField: EntityFieldUpdateOneInput
  neqField: EntityFieldUpdateOneInput
  eqValue: String
  neqValue: String
}

input ActionRequirementPayloadInputValueUpdateWithWhereUniqueWithoutPayloadInput {
  where: ActionRequirementPayloadInputValueWhereUniqueInput!
  data: ActionRequirementPayloadInputValueUpdateWithoutPayloadDataInput!
}

input ActionRequirementPayloadInputValueUpsertWithWhereUniqueWithoutPayloadInput {
  where: ActionRequirementPayloadInputValueWhereUniqueInput!
  update: ActionRequirementPayloadInputValueUpdateWithoutPayloadDataInput!
  create: ActionRequirementPayloadInputValueCreateWithoutPayloadInput!
}

input ActionRequirementPayloadInputValueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  eqField: EntityFieldWhereInput
  neqField: EntityFieldWhereInput
  eqValue: String
  eqValue_not: String
  eqValue_in: [String!]
  eqValue_not_in: [String!]
  eqValue_lt: String
  eqValue_lte: String
  eqValue_gt: String
  eqValue_gte: String
  eqValue_contains: String
  eqValue_not_contains: String
  eqValue_starts_with: String
  eqValue_not_starts_with: String
  eqValue_ends_with: String
  eqValue_not_ends_with: String
  neqValue: String
  neqValue_not: String
  neqValue_in: [String!]
  neqValue_not_in: [String!]
  neqValue_lt: String
  neqValue_lte: String
  neqValue_gt: String
  neqValue_gte: String
  neqValue_contains: String
  neqValue_not_contains: String
  neqValue_starts_with: String
  neqValue_not_starts_with: String
  neqValue_ends_with: String
  neqValue_not_ends_with: String
  payload: ActionRequirementPayloadWhereInput
  AND: [ActionRequirementPayloadInputValueWhereInput!]
  OR: [ActionRequirementPayloadInputValueWhereInput!]
  NOT: [ActionRequirementPayloadInputValueWhereInput!]
}

input ActionRequirementPayloadInputValueWhereUniqueInput {
  id: ID
}

enum ActionRequirementPayloadOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActionRequirementPayloadPreviousValues {
  id: ID!
}

type ActionRequirementPayloadSubscriptionPayload {
  mutation: MutationType!
  node: ActionRequirementPayload
  updatedFields: [String!]
  previousValues: ActionRequirementPayloadPreviousValues
}

input ActionRequirementPayloadSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionRequirementPayloadWhereInput
  AND: [ActionRequirementPayloadSubscriptionWhereInput!]
  OR: [ActionRequirementPayloadSubscriptionWhereInput!]
  NOT: [ActionRequirementPayloadSubscriptionWhereInput!]
}

input ActionRequirementPayloadUpdateInput {
  requiredEntity: ActionRequirementPayloadEntityUpdateOneWithoutPayloadInput
  requiredValues: ActionRequirementPayloadInputValueUpdateManyWithoutPayloadInput
  actionRequirement: ActionRequirementUpdateOneRequiredWithoutPayloadInput
}

input ActionRequirementPayloadUpdateOneRequiredWithoutActionRequirementInput {
  create: ActionRequirementPayloadCreateWithoutActionRequirementInput
  update: ActionRequirementPayloadUpdateWithoutActionRequirementDataInput
  upsert: ActionRequirementPayloadUpsertWithoutActionRequirementInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadUpdateOneRequiredWithoutRequiredEntityInput {
  create: ActionRequirementPayloadCreateWithoutRequiredEntityInput
  update: ActionRequirementPayloadUpdateWithoutRequiredEntityDataInput
  upsert: ActionRequirementPayloadUpsertWithoutRequiredEntityInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadUpdateOneRequiredWithoutRequiredValuesInput {
  create: ActionRequirementPayloadCreateWithoutRequiredValuesInput
  update: ActionRequirementPayloadUpdateWithoutRequiredValuesDataInput
  upsert: ActionRequirementPayloadUpsertWithoutRequiredValuesInput
  connect: ActionRequirementPayloadWhereUniqueInput
}

input ActionRequirementPayloadUpdateWithoutActionRequirementDataInput {
  requiredEntity: ActionRequirementPayloadEntityUpdateOneWithoutPayloadInput
  requiredValues: ActionRequirementPayloadInputValueUpdateManyWithoutPayloadInput
}

input ActionRequirementPayloadUpdateWithoutRequiredEntityDataInput {
  requiredValues: ActionRequirementPayloadInputValueUpdateManyWithoutPayloadInput
  actionRequirement: ActionRequirementUpdateOneRequiredWithoutPayloadInput
}

input ActionRequirementPayloadUpdateWithoutRequiredValuesDataInput {
  requiredEntity: ActionRequirementPayloadEntityUpdateOneWithoutPayloadInput
  actionRequirement: ActionRequirementUpdateOneRequiredWithoutPayloadInput
}

input ActionRequirementPayloadUpsertWithoutActionRequirementInput {
  update: ActionRequirementPayloadUpdateWithoutActionRequirementDataInput!
  create: ActionRequirementPayloadCreateWithoutActionRequirementInput!
}

input ActionRequirementPayloadUpsertWithoutRequiredEntityInput {
  update: ActionRequirementPayloadUpdateWithoutRequiredEntityDataInput!
  create: ActionRequirementPayloadCreateWithoutRequiredEntityInput!
}

input ActionRequirementPayloadUpsertWithoutRequiredValuesInput {
  update: ActionRequirementPayloadUpdateWithoutRequiredValuesDataInput!
  create: ActionRequirementPayloadCreateWithoutRequiredValuesInput!
}

input ActionRequirementPayloadWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  requiredEntity: ActionRequirementPayloadEntityWhereInput
  requiredValues_every: ActionRequirementPayloadInputValueWhereInput
  requiredValues_some: ActionRequirementPayloadInputValueWhereInput
  requiredValues_none: ActionRequirementPayloadInputValueWhereInput
  actionRequirement: ActionRequirementWhereInput
  AND: [ActionRequirementPayloadWhereInput!]
  OR: [ActionRequirementPayloadWhereInput!]
  NOT: [ActionRequirementPayloadWhereInput!]
}

input ActionRequirementPayloadWhereUniqueInput {
  id: ID
}

type ActionRequirementPreviousValues {
  id: ID!
  type: ActionType!
  hints: [String!]!
}

input ActionRequirementScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: ActionType
  type_not: ActionType
  type_in: [ActionType!]
  type_not_in: [ActionType!]
  AND: [ActionRequirementScalarWhereInput!]
  OR: [ActionRequirementScalarWhereInput!]
  NOT: [ActionRequirementScalarWhereInput!]
}

type ActionRequirementSubscriptionPayload {
  mutation: MutationType!
  node: ActionRequirement
  updatedFields: [String!]
  previousValues: ActionRequirementPreviousValues
}

input ActionRequirementSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionRequirementWhereInput
  AND: [ActionRequirementSubscriptionWhereInput!]
  OR: [ActionRequirementSubscriptionWhereInput!]
  NOT: [ActionRequirementSubscriptionWhereInput!]
}

input ActionRequirementUpdateDataInput {
  type: ActionType
  hints: ActionRequirementUpdatehintsInput
  payload: ActionRequirementPayloadUpdateOneRequiredWithoutActionRequirementInput
}

input ActionRequirementUpdatehintsInput {
  set: [String!]
}

input ActionRequirementUpdateInput {
  type: ActionType
  hints: ActionRequirementUpdatehintsInput
  payload: ActionRequirementPayloadUpdateOneRequiredWithoutActionRequirementInput
}

input ActionRequirementUpdateManyDataInput {
  type: ActionType
  hints: ActionRequirementUpdatehintsInput
}

input ActionRequirementUpdateManyInput {
  create: [ActionRequirementCreateInput!]
  update: [ActionRequirementUpdateWithWhereUniqueNestedInput!]
  upsert: [ActionRequirementUpsertWithWhereUniqueNestedInput!]
  delete: [ActionRequirementWhereUniqueInput!]
  connect: [ActionRequirementWhereUniqueInput!]
  disconnect: [ActionRequirementWhereUniqueInput!]
  deleteMany: [ActionRequirementScalarWhereInput!]
  updateMany: [ActionRequirementUpdateManyWithWhereNestedInput!]
}

input ActionRequirementUpdateManyMutationInput {
  type: ActionType
  hints: ActionRequirementUpdatehintsInput
}

input ActionRequirementUpdateManyWithWhereNestedInput {
  where: ActionRequirementScalarWhereInput!
  data: ActionRequirementUpdateManyDataInput!
}

input ActionRequirementUpdateOneRequiredWithoutPayloadInput {
  create: ActionRequirementCreateWithoutPayloadInput
  update: ActionRequirementUpdateWithoutPayloadDataInput
  upsert: ActionRequirementUpsertWithoutPayloadInput
  connect: ActionRequirementWhereUniqueInput
}

input ActionRequirementUpdateWithoutPayloadDataInput {
  type: ActionType
  hints: ActionRequirementUpdatehintsInput
}

input ActionRequirementUpdateWithWhereUniqueNestedInput {
  where: ActionRequirementWhereUniqueInput!
  data: ActionRequirementUpdateDataInput!
}

input ActionRequirementUpsertWithoutPayloadInput {
  update: ActionRequirementUpdateWithoutPayloadDataInput!
  create: ActionRequirementCreateWithoutPayloadInput!
}

input ActionRequirementUpsertWithWhereUniqueNestedInput {
  where: ActionRequirementWhereUniqueInput!
  update: ActionRequirementUpdateDataInput!
  create: ActionRequirementCreateInput!
}

input ActionRequirementWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: ActionType
  type_not: ActionType
  type_in: [ActionType!]
  type_not_in: [ActionType!]
  payload: ActionRequirementPayloadWhereInput
  AND: [ActionRequirementWhereInput!]
  OR: [ActionRequirementWhereInput!]
  NOT: [ActionRequirementWhereInput!]
}

input ActionRequirementWhereUniqueInput {
  id: ID
}

input ActionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  type: ActionType
  type_not: ActionType
  type_in: [ActionType!]
  type_not_in: [ActionType!]
  AND: [ActionScalarWhereInput!]
  OR: [ActionScalarWhereInput!]
  NOT: [ActionScalarWhereInput!]
}

type ActionSubscriptionPayload {
  mutation: MutationType!
  node: Action
  updatedFields: [String!]
  previousValues: ActionPreviousValues
}

input ActionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActionWhereInput
  AND: [ActionSubscriptionWhereInput!]
  OR: [ActionSubscriptionWhereInput!]
  NOT: [ActionSubscriptionWhereInput!]
}

enum ActionType {
  USE
  TARGET_OF_USE
  INPUT
  TRANSFORM
  TRIGGER
  UNLOCK
  IDENTIFY_HELPER
}

input ActionUpdateInput {
  type: ActionType
  payload: ActionPayloadUpdateOneRequiredWithoutActionInput
  gamePlay: GamePlayUpdateOneRequiredWithoutActionsInput
}

input ActionUpdateManyDataInput {
  type: ActionType
}

input ActionUpdateManyMutationInput {
  type: ActionType
}

input ActionUpdateManyWithoutGamePlayInput {
  create: [ActionCreateWithoutGamePlayInput!]
  delete: [ActionWhereUniqueInput!]
  connect: [ActionWhereUniqueInput!]
  disconnect: [ActionWhereUniqueInput!]
  update: [ActionUpdateWithWhereUniqueWithoutGamePlayInput!]
  upsert: [ActionUpsertWithWhereUniqueWithoutGamePlayInput!]
  deleteMany: [ActionScalarWhereInput!]
  updateMany: [ActionUpdateManyWithWhereNestedInput!]
}

input ActionUpdateManyWithWhereNestedInput {
  where: ActionScalarWhereInput!
  data: ActionUpdateManyDataInput!
}

input ActionUpdateOneWithoutPayloadInput {
  create: ActionCreateWithoutPayloadInput
  update: ActionUpdateWithoutPayloadDataInput
  upsert: ActionUpsertWithoutPayloadInput
  delete: Boolean
  disconnect: Boolean
  connect: ActionWhereUniqueInput
}

input ActionUpdateWithoutGamePlayDataInput {
  type: ActionType
  payload: ActionPayloadUpdateOneRequiredWithoutActionInput
}

input ActionUpdateWithoutPayloadDataInput {
  type: ActionType
  gamePlay: GamePlayUpdateOneRequiredWithoutActionsInput
}

input ActionUpdateWithWhereUniqueWithoutGamePlayInput {
  where: ActionWhereUniqueInput!
  data: ActionUpdateWithoutGamePlayDataInput!
}

input ActionUpsertWithoutPayloadInput {
  update: ActionUpdateWithoutPayloadDataInput!
  create: ActionCreateWithoutPayloadInput!
}

input ActionUpsertWithWhereUniqueWithoutGamePlayInput {
  where: ActionWhereUniqueInput!
  update: ActionUpdateWithoutGamePlayDataInput!
  create: ActionCreateWithoutGamePlayInput!
}

input ActionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  type: ActionType
  type_not: ActionType
  type_in: [ActionType!]
  type_not_in: [ActionType!]
  payload: ActionPayloadWhereInput
  gamePlay: GamePlayWhereInput
  AND: [ActionWhereInput!]
  OR: [ActionWhereInput!]
  NOT: [ActionWhereInput!]
}

input ActionWhereUniqueInput {
  id: ID
}

type AggregateAction {
  count: Int!
}

type AggregateActionPayload {
  count: Int!
}

type AggregateActionPayloadInputValue {
  count: Int!
}

type AggregateActionRequirement {
  count: Int!
}

type AggregateActionRequirementPayload {
  count: Int!
}

type AggregateActionRequirementPayloadEntity {
  count: Int!
}

type AggregateActionRequirementPayloadInputValue {
  count: Int!
}

type AggregateEntity {
  count: Int!
}

type AggregateEntityField {
  count: Int!
}

type AggregateEntityInstance {
  count: Int!
}

type AggregateEntityInstanceField {
  count: Int!
}

type AggregateEntityInstanceState {
  count: Int!
}

type AggregateEntityInstanceStateTransition {
  count: Int!
}

type AggregateEntityState {
  count: Int!
}

type AggregateEntityStateTransition {
  count: Int!
}

type AggregateGame {
  count: Int!
}

type AggregateGamePlay {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Entity {
  id: ID!
  name: String!
  description: String
  isTrigger: Boolean!
  isItem: Boolean!
  isObject: Boolean!
  fields(where: EntityFieldWhereInput, orderBy: EntityFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityField!]
  states(where: EntityStateWhereInput, orderBy: EntityStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityState!]
  defaultState: EntityState
  instances(where: EntityInstanceWhereInput, orderBy: EntityInstanceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstance!]
}

type EntityConnection {
  pageInfo: PageInfo!
  edges: [EntityEdge]!
  aggregate: AggregateEntity!
}

input EntityCreateInput {
  name: String!
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldCreateManyWithoutEntityInput
  states: EntityStateCreateManyWithoutEntityInput
  defaultState: EntityStateCreateOneInput
  instances: EntityInstanceCreateManyWithoutEntityInput
}

input EntityCreateOneInput {
  create: EntityCreateInput
  connect: EntityWhereUniqueInput
}

input EntityCreateOneWithoutFieldsInput {
  create: EntityCreateWithoutFieldsInput
  connect: EntityWhereUniqueInput
}

input EntityCreateOneWithoutInstancesInput {
  create: EntityCreateWithoutInstancesInput
  connect: EntityWhereUniqueInput
}

input EntityCreateOneWithoutStatesInput {
  create: EntityCreateWithoutStatesInput
  connect: EntityWhereUniqueInput
}

input EntityCreateWithoutFieldsInput {
  name: String!
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  states: EntityStateCreateManyWithoutEntityInput
  defaultState: EntityStateCreateOneInput
  instances: EntityInstanceCreateManyWithoutEntityInput
}

input EntityCreateWithoutInstancesInput {
  name: String!
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldCreateManyWithoutEntityInput
  states: EntityStateCreateManyWithoutEntityInput
  defaultState: EntityStateCreateOneInput
}

input EntityCreateWithoutStatesInput {
  name: String!
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldCreateManyWithoutEntityInput
  defaultState: EntityStateCreateOneInput
  instances: EntityInstanceCreateManyWithoutEntityInput
}

type EntityEdge {
  node: Entity!
  cursor: String!
}

type EntityField {
  id: ID!
  info: String
  label: String!
  type: FieldType!
  isMulti: Boolean!
  isSecret: Boolean!
  entity: Entity!
}

type EntityFieldConnection {
  pageInfo: PageInfo!
  edges: [EntityFieldEdge]!
  aggregate: AggregateEntityField!
}

input EntityFieldCreateInput {
  info: String
  label: String!
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
  entity: EntityCreateOneWithoutFieldsInput!
}

input EntityFieldCreateManyWithoutEntityInput {
  create: [EntityFieldCreateWithoutEntityInput!]
  connect: [EntityFieldWhereUniqueInput!]
}

input EntityFieldCreateOneInput {
  create: EntityFieldCreateInput
  connect: EntityFieldWhereUniqueInput
}

input EntityFieldCreateWithoutEntityInput {
  info: String
  label: String!
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
}

type EntityFieldEdge {
  node: EntityField!
  cursor: String!
}

enum EntityFieldOrderByInput {
  id_ASC
  id_DESC
  info_ASC
  info_DESC
  label_ASC
  label_DESC
  type_ASC
  type_DESC
  isMulti_ASC
  isMulti_DESC
  isSecret_ASC
  isSecret_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityFieldPreviousValues {
  id: ID!
  info: String
  label: String!
  type: FieldType!
  isMulti: Boolean!
  isSecret: Boolean!
}

input EntityFieldScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  info: String
  info_not: String
  info_in: [String!]
  info_not_in: [String!]
  info_lt: String
  info_lte: String
  info_gt: String
  info_gte: String
  info_contains: String
  info_not_contains: String
  info_starts_with: String
  info_not_starts_with: String
  info_ends_with: String
  info_not_ends_with: String
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  type: FieldType
  type_not: FieldType
  type_in: [FieldType!]
  type_not_in: [FieldType!]
  isMulti: Boolean
  isMulti_not: Boolean
  isSecret: Boolean
  isSecret_not: Boolean
  AND: [EntityFieldScalarWhereInput!]
  OR: [EntityFieldScalarWhereInput!]
  NOT: [EntityFieldScalarWhereInput!]
}

type EntityFieldSubscriptionPayload {
  mutation: MutationType!
  node: EntityField
  updatedFields: [String!]
  previousValues: EntityFieldPreviousValues
}

input EntityFieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityFieldWhereInput
  AND: [EntityFieldSubscriptionWhereInput!]
  OR: [EntityFieldSubscriptionWhereInput!]
  NOT: [EntityFieldSubscriptionWhereInput!]
}

input EntityFieldUpdateDataInput {
  info: String
  label: String
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
  entity: EntityUpdateOneRequiredWithoutFieldsInput
}

input EntityFieldUpdateInput {
  info: String
  label: String
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
  entity: EntityUpdateOneRequiredWithoutFieldsInput
}

input EntityFieldUpdateManyDataInput {
  info: String
  label: String
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
}

input EntityFieldUpdateManyMutationInput {
  info: String
  label: String
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
}

input EntityFieldUpdateManyWithoutEntityInput {
  create: [EntityFieldCreateWithoutEntityInput!]
  delete: [EntityFieldWhereUniqueInput!]
  connect: [EntityFieldWhereUniqueInput!]
  disconnect: [EntityFieldWhereUniqueInput!]
  update: [EntityFieldUpdateWithWhereUniqueWithoutEntityInput!]
  upsert: [EntityFieldUpsertWithWhereUniqueWithoutEntityInput!]
  deleteMany: [EntityFieldScalarWhereInput!]
  updateMany: [EntityFieldUpdateManyWithWhereNestedInput!]
}

input EntityFieldUpdateManyWithWhereNestedInput {
  where: EntityFieldScalarWhereInput!
  data: EntityFieldUpdateManyDataInput!
}

input EntityFieldUpdateOneInput {
  create: EntityFieldCreateInput
  update: EntityFieldUpdateDataInput
  upsert: EntityFieldUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityFieldWhereUniqueInput
}

input EntityFieldUpdateOneRequiredInput {
  create: EntityFieldCreateInput
  update: EntityFieldUpdateDataInput
  upsert: EntityFieldUpsertNestedInput
  connect: EntityFieldWhereUniqueInput
}

input EntityFieldUpdateWithoutEntityDataInput {
  info: String
  label: String
  type: FieldType
  isMulti: Boolean
  isSecret: Boolean
}

input EntityFieldUpdateWithWhereUniqueWithoutEntityInput {
  where: EntityFieldWhereUniqueInput!
  data: EntityFieldUpdateWithoutEntityDataInput!
}

input EntityFieldUpsertNestedInput {
  update: EntityFieldUpdateDataInput!
  create: EntityFieldCreateInput!
}

input EntityFieldUpsertWithWhereUniqueWithoutEntityInput {
  where: EntityFieldWhereUniqueInput!
  update: EntityFieldUpdateWithoutEntityDataInput!
  create: EntityFieldCreateWithoutEntityInput!
}

input EntityFieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  info: String
  info_not: String
  info_in: [String!]
  info_not_in: [String!]
  info_lt: String
  info_lte: String
  info_gt: String
  info_gte: String
  info_contains: String
  info_not_contains: String
  info_starts_with: String
  info_not_starts_with: String
  info_ends_with: String
  info_not_ends_with: String
  label: String
  label_not: String
  label_in: [String!]
  label_not_in: [String!]
  label_lt: String
  label_lte: String
  label_gt: String
  label_gte: String
  label_contains: String
  label_not_contains: String
  label_starts_with: String
  label_not_starts_with: String
  label_ends_with: String
  label_not_ends_with: String
  type: FieldType
  type_not: FieldType
  type_in: [FieldType!]
  type_not_in: [FieldType!]
  isMulti: Boolean
  isMulti_not: Boolean
  isSecret: Boolean
  isSecret_not: Boolean
  entity: EntityWhereInput
  AND: [EntityFieldWhereInput!]
  OR: [EntityFieldWhereInput!]
  NOT: [EntityFieldWhereInput!]
}

input EntityFieldWhereUniqueInput {
  id: ID
}

type EntityInstance {
  id: ID!
  name: String
  description: String
  game: Game!
  entity: Entity!
  fields(where: EntityInstanceFieldWhereInput, orderBy: EntityInstanceFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceField!]
  states(where: EntityInstanceStateWhereInput, orderBy: EntityInstanceStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceState!]
}

type EntityInstanceConnection {
  pageInfo: PageInfo!
  edges: [EntityInstanceEdge]!
  aggregate: AggregateEntityInstance!
}

input EntityInstanceCreateInput {
  name: String
  description: String
  game: GameCreateOneWithoutInstancesInput!
  entity: EntityCreateOneWithoutInstancesInput!
  fields: EntityInstanceFieldCreateManyInput
  states: EntityInstanceStateCreateManyWithoutInstanceInput
}

input EntityInstanceCreateManyWithoutEntityInput {
  create: [EntityInstanceCreateWithoutEntityInput!]
  connect: [EntityInstanceWhereUniqueInput!]
}

input EntityInstanceCreateManyWithoutGameInput {
  create: [EntityInstanceCreateWithoutGameInput!]
  connect: [EntityInstanceWhereUniqueInput!]
}

input EntityInstanceCreateOneInput {
  create: EntityInstanceCreateInput
  connect: EntityInstanceWhereUniqueInput
}

input EntityInstanceCreateOneWithoutStatesInput {
  create: EntityInstanceCreateWithoutStatesInput
  connect: EntityInstanceWhereUniqueInput
}

input EntityInstanceCreateWithoutEntityInput {
  name: String
  description: String
  game: GameCreateOneWithoutInstancesInput!
  fields: EntityInstanceFieldCreateManyInput
  states: EntityInstanceStateCreateManyWithoutInstanceInput
}

input EntityInstanceCreateWithoutGameInput {
  name: String
  description: String
  entity: EntityCreateOneWithoutInstancesInput!
  fields: EntityInstanceFieldCreateManyInput
  states: EntityInstanceStateCreateManyWithoutInstanceInput
}

input EntityInstanceCreateWithoutStatesInput {
  name: String
  description: String
  game: GameCreateOneWithoutInstancesInput!
  entity: EntityCreateOneWithoutInstancesInput!
  fields: EntityInstanceFieldCreateManyInput
}

type EntityInstanceEdge {
  node: EntityInstance!
  cursor: String!
}

type EntityInstanceField {
  id: ID!
  field: EntityField!
  value: String
}

type EntityInstanceFieldConnection {
  pageInfo: PageInfo!
  edges: [EntityInstanceFieldEdge]!
  aggregate: AggregateEntityInstanceField!
}

input EntityInstanceFieldCreateInput {
  field: EntityFieldCreateOneInput!
  value: String
}

input EntityInstanceFieldCreateManyInput {
  create: [EntityInstanceFieldCreateInput!]
  connect: [EntityInstanceFieldWhereUniqueInput!]
}

type EntityInstanceFieldEdge {
  node: EntityInstanceField!
  cursor: String!
}

enum EntityInstanceFieldOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityInstanceFieldPreviousValues {
  id: ID!
  value: String
}

input EntityInstanceFieldScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [EntityInstanceFieldScalarWhereInput!]
  OR: [EntityInstanceFieldScalarWhereInput!]
  NOT: [EntityInstanceFieldScalarWhereInput!]
}

type EntityInstanceFieldSubscriptionPayload {
  mutation: MutationType!
  node: EntityInstanceField
  updatedFields: [String!]
  previousValues: EntityInstanceFieldPreviousValues
}

input EntityInstanceFieldSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityInstanceFieldWhereInput
  AND: [EntityInstanceFieldSubscriptionWhereInput!]
  OR: [EntityInstanceFieldSubscriptionWhereInput!]
  NOT: [EntityInstanceFieldSubscriptionWhereInput!]
}

input EntityInstanceFieldUpdateDataInput {
  field: EntityFieldUpdateOneRequiredInput
  value: String
}

input EntityInstanceFieldUpdateInput {
  field: EntityFieldUpdateOneRequiredInput
  value: String
}

input EntityInstanceFieldUpdateManyDataInput {
  value: String
}

input EntityInstanceFieldUpdateManyInput {
  create: [EntityInstanceFieldCreateInput!]
  update: [EntityInstanceFieldUpdateWithWhereUniqueNestedInput!]
  upsert: [EntityInstanceFieldUpsertWithWhereUniqueNestedInput!]
  delete: [EntityInstanceFieldWhereUniqueInput!]
  connect: [EntityInstanceFieldWhereUniqueInput!]
  disconnect: [EntityInstanceFieldWhereUniqueInput!]
  deleteMany: [EntityInstanceFieldScalarWhereInput!]
  updateMany: [EntityInstanceFieldUpdateManyWithWhereNestedInput!]
}

input EntityInstanceFieldUpdateManyMutationInput {
  value: String
}

input EntityInstanceFieldUpdateManyWithWhereNestedInput {
  where: EntityInstanceFieldScalarWhereInput!
  data: EntityInstanceFieldUpdateManyDataInput!
}

input EntityInstanceFieldUpdateWithWhereUniqueNestedInput {
  where: EntityInstanceFieldWhereUniqueInput!
  data: EntityInstanceFieldUpdateDataInput!
}

input EntityInstanceFieldUpsertWithWhereUniqueNestedInput {
  where: EntityInstanceFieldWhereUniqueInput!
  update: EntityInstanceFieldUpdateDataInput!
  create: EntityInstanceFieldCreateInput!
}

input EntityInstanceFieldWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  field: EntityFieldWhereInput
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [EntityInstanceFieldWhereInput!]
  OR: [EntityInstanceFieldWhereInput!]
  NOT: [EntityInstanceFieldWhereInput!]
}

input EntityInstanceFieldWhereUniqueInput {
  id: ID
}

enum EntityInstanceOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityInstancePreviousValues {
  id: ID!
  name: String
  description: String
}

input EntityInstanceScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [EntityInstanceScalarWhereInput!]
  OR: [EntityInstanceScalarWhereInput!]
  NOT: [EntityInstanceScalarWhereInput!]
}

type EntityInstanceState {
  id: ID!
  state: EntityState!
  outgoingTransitions(where: EntityInstanceStateTransitionWhereInput, orderBy: EntityInstanceStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceStateTransition!]
  incomingTransitions(where: EntityInstanceStateTransitionWhereInput, orderBy: EntityInstanceStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceStateTransition!]
  unlockedBy: EntityInstanceStateTransition
  instance: EntityInstance!
}

type EntityInstanceStateConnection {
  pageInfo: PageInfo!
  edges: [EntityInstanceStateEdge]!
  aggregate: AggregateEntityInstanceState!
}

input EntityInstanceStateCreateInput {
  state: EntityStateCreateOneInput!
  outgoingTransitions: EntityInstanceStateTransitionCreateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionCreateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionCreateOneWithoutUnlocksInput
  instance: EntityInstanceCreateOneWithoutStatesInput!
}

input EntityInstanceStateCreateManyWithoutInstanceInput {
  create: [EntityInstanceStateCreateWithoutInstanceInput!]
  connect: [EntityInstanceStateWhereUniqueInput!]
}

input EntityInstanceStateCreateManyWithoutUnlockedByInput {
  create: [EntityInstanceStateCreateWithoutUnlockedByInput!]
  connect: [EntityInstanceStateWhereUniqueInput!]
}

input EntityInstanceStateCreateOneWithoutIncomingTransitionsInput {
  create: EntityInstanceStateCreateWithoutIncomingTransitionsInput
  connect: EntityInstanceStateWhereUniqueInput
}

input EntityInstanceStateCreateOneWithoutOutgoingTransitionsInput {
  create: EntityInstanceStateCreateWithoutOutgoingTransitionsInput
  connect: EntityInstanceStateWhereUniqueInput
}

input EntityInstanceStateCreateWithoutIncomingTransitionsInput {
  state: EntityStateCreateOneInput!
  outgoingTransitions: EntityInstanceStateTransitionCreateManyWithoutFromInput
  unlockedBy: EntityInstanceStateTransitionCreateOneWithoutUnlocksInput
  instance: EntityInstanceCreateOneWithoutStatesInput!
}

input EntityInstanceStateCreateWithoutInstanceInput {
  state: EntityStateCreateOneInput!
  outgoingTransitions: EntityInstanceStateTransitionCreateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionCreateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionCreateOneWithoutUnlocksInput
}

input EntityInstanceStateCreateWithoutOutgoingTransitionsInput {
  state: EntityStateCreateOneInput!
  incomingTransitions: EntityInstanceStateTransitionCreateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionCreateOneWithoutUnlocksInput
  instance: EntityInstanceCreateOneWithoutStatesInput!
}

input EntityInstanceStateCreateWithoutUnlockedByInput {
  state: EntityStateCreateOneInput!
  outgoingTransitions: EntityInstanceStateTransitionCreateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionCreateManyWithoutToInput
  instance: EntityInstanceCreateOneWithoutStatesInput!
}

type EntityInstanceStateEdge {
  node: EntityInstanceState!
  cursor: String!
}

enum EntityInstanceStateOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityInstanceStatePreviousValues {
  id: ID!
}

input EntityInstanceStateScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [EntityInstanceStateScalarWhereInput!]
  OR: [EntityInstanceStateScalarWhereInput!]
  NOT: [EntityInstanceStateScalarWhereInput!]
}

type EntityInstanceStateSubscriptionPayload {
  mutation: MutationType!
  node: EntityInstanceState
  updatedFields: [String!]
  previousValues: EntityInstanceStatePreviousValues
}

input EntityInstanceStateSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityInstanceStateWhereInput
  AND: [EntityInstanceStateSubscriptionWhereInput!]
  OR: [EntityInstanceStateSubscriptionWhereInput!]
  NOT: [EntityInstanceStateSubscriptionWhereInput!]
}

type EntityInstanceStateTransition {
  id: ID!
  from: EntityInstanceState!
  to: EntityInstanceState
  unlocks(where: EntityInstanceStateWhereInput, orderBy: EntityInstanceStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceState!]
}

type EntityInstanceStateTransitionConnection {
  pageInfo: PageInfo!
  edges: [EntityInstanceStateTransitionEdge]!
  aggregate: AggregateEntityInstanceStateTransition!
}

input EntityInstanceStateTransitionCreateInput {
  from: EntityInstanceStateCreateOneWithoutOutgoingTransitionsInput!
  to: EntityInstanceStateCreateOneWithoutIncomingTransitionsInput
  unlocks: EntityInstanceStateCreateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionCreateManyWithoutFromInput {
  create: [EntityInstanceStateTransitionCreateWithoutFromInput!]
  connect: [EntityInstanceStateTransitionWhereUniqueInput!]
}

input EntityInstanceStateTransitionCreateManyWithoutToInput {
  create: [EntityInstanceStateTransitionCreateWithoutToInput!]
  connect: [EntityInstanceStateTransitionWhereUniqueInput!]
}

input EntityInstanceStateTransitionCreateOneWithoutUnlocksInput {
  create: EntityInstanceStateTransitionCreateWithoutUnlocksInput
  connect: EntityInstanceStateTransitionWhereUniqueInput
}

input EntityInstanceStateTransitionCreateWithoutFromInput {
  to: EntityInstanceStateCreateOneWithoutIncomingTransitionsInput
  unlocks: EntityInstanceStateCreateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionCreateWithoutToInput {
  from: EntityInstanceStateCreateOneWithoutOutgoingTransitionsInput!
  unlocks: EntityInstanceStateCreateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionCreateWithoutUnlocksInput {
  from: EntityInstanceStateCreateOneWithoutOutgoingTransitionsInput!
  to: EntityInstanceStateCreateOneWithoutIncomingTransitionsInput
}

type EntityInstanceStateTransitionEdge {
  node: EntityInstanceStateTransition!
  cursor: String!
}

enum EntityInstanceStateTransitionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityInstanceStateTransitionPreviousValues {
  id: ID!
}

input EntityInstanceStateTransitionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [EntityInstanceStateTransitionScalarWhereInput!]
  OR: [EntityInstanceStateTransitionScalarWhereInput!]
  NOT: [EntityInstanceStateTransitionScalarWhereInput!]
}

type EntityInstanceStateTransitionSubscriptionPayload {
  mutation: MutationType!
  node: EntityInstanceStateTransition
  updatedFields: [String!]
  previousValues: EntityInstanceStateTransitionPreviousValues
}

input EntityInstanceStateTransitionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityInstanceStateTransitionWhereInput
  AND: [EntityInstanceStateTransitionSubscriptionWhereInput!]
  OR: [EntityInstanceStateTransitionSubscriptionWhereInput!]
  NOT: [EntityInstanceStateTransitionSubscriptionWhereInput!]
}

input EntityInstanceStateTransitionUpdateInput {
  from: EntityInstanceStateUpdateOneRequiredWithoutOutgoingTransitionsInput
  to: EntityInstanceStateUpdateOneWithoutIncomingTransitionsInput
  unlocks: EntityInstanceStateUpdateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionUpdateManyWithoutFromInput {
  create: [EntityInstanceStateTransitionCreateWithoutFromInput!]
  delete: [EntityInstanceStateTransitionWhereUniqueInput!]
  connect: [EntityInstanceStateTransitionWhereUniqueInput!]
  disconnect: [EntityInstanceStateTransitionWhereUniqueInput!]
  update: [EntityInstanceStateTransitionUpdateWithWhereUniqueWithoutFromInput!]
  upsert: [EntityInstanceStateTransitionUpsertWithWhereUniqueWithoutFromInput!]
  deleteMany: [EntityInstanceStateTransitionScalarWhereInput!]
}

input EntityInstanceStateTransitionUpdateManyWithoutToInput {
  create: [EntityInstanceStateTransitionCreateWithoutToInput!]
  delete: [EntityInstanceStateTransitionWhereUniqueInput!]
  connect: [EntityInstanceStateTransitionWhereUniqueInput!]
  disconnect: [EntityInstanceStateTransitionWhereUniqueInput!]
  update: [EntityInstanceStateTransitionUpdateWithWhereUniqueWithoutToInput!]
  upsert: [EntityInstanceStateTransitionUpsertWithWhereUniqueWithoutToInput!]
  deleteMany: [EntityInstanceStateTransitionScalarWhereInput!]
}

input EntityInstanceStateTransitionUpdateOneWithoutUnlocksInput {
  create: EntityInstanceStateTransitionCreateWithoutUnlocksInput
  update: EntityInstanceStateTransitionUpdateWithoutUnlocksDataInput
  upsert: EntityInstanceStateTransitionUpsertWithoutUnlocksInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityInstanceStateTransitionWhereUniqueInput
}

input EntityInstanceStateTransitionUpdateWithoutFromDataInput {
  to: EntityInstanceStateUpdateOneWithoutIncomingTransitionsInput
  unlocks: EntityInstanceStateUpdateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionUpdateWithoutToDataInput {
  from: EntityInstanceStateUpdateOneRequiredWithoutOutgoingTransitionsInput
  unlocks: EntityInstanceStateUpdateManyWithoutUnlockedByInput
}

input EntityInstanceStateTransitionUpdateWithoutUnlocksDataInput {
  from: EntityInstanceStateUpdateOneRequiredWithoutOutgoingTransitionsInput
  to: EntityInstanceStateUpdateOneWithoutIncomingTransitionsInput
}

input EntityInstanceStateTransitionUpdateWithWhereUniqueWithoutFromInput {
  where: EntityInstanceStateTransitionWhereUniqueInput!
  data: EntityInstanceStateTransitionUpdateWithoutFromDataInput!
}

input EntityInstanceStateTransitionUpdateWithWhereUniqueWithoutToInput {
  where: EntityInstanceStateTransitionWhereUniqueInput!
  data: EntityInstanceStateTransitionUpdateWithoutToDataInput!
}

input EntityInstanceStateTransitionUpsertWithoutUnlocksInput {
  update: EntityInstanceStateTransitionUpdateWithoutUnlocksDataInput!
  create: EntityInstanceStateTransitionCreateWithoutUnlocksInput!
}

input EntityInstanceStateTransitionUpsertWithWhereUniqueWithoutFromInput {
  where: EntityInstanceStateTransitionWhereUniqueInput!
  update: EntityInstanceStateTransitionUpdateWithoutFromDataInput!
  create: EntityInstanceStateTransitionCreateWithoutFromInput!
}

input EntityInstanceStateTransitionUpsertWithWhereUniqueWithoutToInput {
  where: EntityInstanceStateTransitionWhereUniqueInput!
  update: EntityInstanceStateTransitionUpdateWithoutToDataInput!
  create: EntityInstanceStateTransitionCreateWithoutToInput!
}

input EntityInstanceStateTransitionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  from: EntityInstanceStateWhereInput
  to: EntityInstanceStateWhereInput
  unlocks_every: EntityInstanceStateWhereInput
  unlocks_some: EntityInstanceStateWhereInput
  unlocks_none: EntityInstanceStateWhereInput
  AND: [EntityInstanceStateTransitionWhereInput!]
  OR: [EntityInstanceStateTransitionWhereInput!]
  NOT: [EntityInstanceStateTransitionWhereInput!]
}

input EntityInstanceStateTransitionWhereUniqueInput {
  id: ID
}

input EntityInstanceStateUpdateInput {
  state: EntityStateUpdateOneRequiredInput
  outgoingTransitions: EntityInstanceStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionUpdateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionUpdateOneWithoutUnlocksInput
  instance: EntityInstanceUpdateOneRequiredWithoutStatesInput
}

input EntityInstanceStateUpdateManyWithoutInstanceInput {
  create: [EntityInstanceStateCreateWithoutInstanceInput!]
  delete: [EntityInstanceStateWhereUniqueInput!]
  connect: [EntityInstanceStateWhereUniqueInput!]
  disconnect: [EntityInstanceStateWhereUniqueInput!]
  update: [EntityInstanceStateUpdateWithWhereUniqueWithoutInstanceInput!]
  upsert: [EntityInstanceStateUpsertWithWhereUniqueWithoutInstanceInput!]
  deleteMany: [EntityInstanceStateScalarWhereInput!]
}

input EntityInstanceStateUpdateManyWithoutUnlockedByInput {
  create: [EntityInstanceStateCreateWithoutUnlockedByInput!]
  delete: [EntityInstanceStateWhereUniqueInput!]
  connect: [EntityInstanceStateWhereUniqueInput!]
  disconnect: [EntityInstanceStateWhereUniqueInput!]
  update: [EntityInstanceStateUpdateWithWhereUniqueWithoutUnlockedByInput!]
  upsert: [EntityInstanceStateUpsertWithWhereUniqueWithoutUnlockedByInput!]
  deleteMany: [EntityInstanceStateScalarWhereInput!]
}

input EntityInstanceStateUpdateOneRequiredWithoutOutgoingTransitionsInput {
  create: EntityInstanceStateCreateWithoutOutgoingTransitionsInput
  update: EntityInstanceStateUpdateWithoutOutgoingTransitionsDataInput
  upsert: EntityInstanceStateUpsertWithoutOutgoingTransitionsInput
  connect: EntityInstanceStateWhereUniqueInput
}

input EntityInstanceStateUpdateOneWithoutIncomingTransitionsInput {
  create: EntityInstanceStateCreateWithoutIncomingTransitionsInput
  update: EntityInstanceStateUpdateWithoutIncomingTransitionsDataInput
  upsert: EntityInstanceStateUpsertWithoutIncomingTransitionsInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityInstanceStateWhereUniqueInput
}

input EntityInstanceStateUpdateWithoutIncomingTransitionsDataInput {
  state: EntityStateUpdateOneRequiredInput
  outgoingTransitions: EntityInstanceStateTransitionUpdateManyWithoutFromInput
  unlockedBy: EntityInstanceStateTransitionUpdateOneWithoutUnlocksInput
  instance: EntityInstanceUpdateOneRequiredWithoutStatesInput
}

input EntityInstanceStateUpdateWithoutInstanceDataInput {
  state: EntityStateUpdateOneRequiredInput
  outgoingTransitions: EntityInstanceStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionUpdateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionUpdateOneWithoutUnlocksInput
}

input EntityInstanceStateUpdateWithoutOutgoingTransitionsDataInput {
  state: EntityStateUpdateOneRequiredInput
  incomingTransitions: EntityInstanceStateTransitionUpdateManyWithoutToInput
  unlockedBy: EntityInstanceStateTransitionUpdateOneWithoutUnlocksInput
  instance: EntityInstanceUpdateOneRequiredWithoutStatesInput
}

input EntityInstanceStateUpdateWithoutUnlockedByDataInput {
  state: EntityStateUpdateOneRequiredInput
  outgoingTransitions: EntityInstanceStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityInstanceStateTransitionUpdateManyWithoutToInput
  instance: EntityInstanceUpdateOneRequiredWithoutStatesInput
}

input EntityInstanceStateUpdateWithWhereUniqueWithoutInstanceInput {
  where: EntityInstanceStateWhereUniqueInput!
  data: EntityInstanceStateUpdateWithoutInstanceDataInput!
}

input EntityInstanceStateUpdateWithWhereUniqueWithoutUnlockedByInput {
  where: EntityInstanceStateWhereUniqueInput!
  data: EntityInstanceStateUpdateWithoutUnlockedByDataInput!
}

input EntityInstanceStateUpsertWithoutIncomingTransitionsInput {
  update: EntityInstanceStateUpdateWithoutIncomingTransitionsDataInput!
  create: EntityInstanceStateCreateWithoutIncomingTransitionsInput!
}

input EntityInstanceStateUpsertWithoutOutgoingTransitionsInput {
  update: EntityInstanceStateUpdateWithoutOutgoingTransitionsDataInput!
  create: EntityInstanceStateCreateWithoutOutgoingTransitionsInput!
}

input EntityInstanceStateUpsertWithWhereUniqueWithoutInstanceInput {
  where: EntityInstanceStateWhereUniqueInput!
  update: EntityInstanceStateUpdateWithoutInstanceDataInput!
  create: EntityInstanceStateCreateWithoutInstanceInput!
}

input EntityInstanceStateUpsertWithWhereUniqueWithoutUnlockedByInput {
  where: EntityInstanceStateWhereUniqueInput!
  update: EntityInstanceStateUpdateWithoutUnlockedByDataInput!
  create: EntityInstanceStateCreateWithoutUnlockedByInput!
}

input EntityInstanceStateWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  state: EntityStateWhereInput
  outgoingTransitions_every: EntityInstanceStateTransitionWhereInput
  outgoingTransitions_some: EntityInstanceStateTransitionWhereInput
  outgoingTransitions_none: EntityInstanceStateTransitionWhereInput
  incomingTransitions_every: EntityInstanceStateTransitionWhereInput
  incomingTransitions_some: EntityInstanceStateTransitionWhereInput
  incomingTransitions_none: EntityInstanceStateTransitionWhereInput
  unlockedBy: EntityInstanceStateTransitionWhereInput
  instance: EntityInstanceWhereInput
  AND: [EntityInstanceStateWhereInput!]
  OR: [EntityInstanceStateWhereInput!]
  NOT: [EntityInstanceStateWhereInput!]
}

input EntityInstanceStateWhereUniqueInput {
  id: ID
}

type EntityInstanceSubscriptionPayload {
  mutation: MutationType!
  node: EntityInstance
  updatedFields: [String!]
  previousValues: EntityInstancePreviousValues
}

input EntityInstanceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityInstanceWhereInput
  AND: [EntityInstanceSubscriptionWhereInput!]
  OR: [EntityInstanceSubscriptionWhereInput!]
  NOT: [EntityInstanceSubscriptionWhereInput!]
}

input EntityInstanceUpdateDataInput {
  name: String
  description: String
  game: GameUpdateOneRequiredWithoutInstancesInput
  entity: EntityUpdateOneRequiredWithoutInstancesInput
  fields: EntityInstanceFieldUpdateManyInput
  states: EntityInstanceStateUpdateManyWithoutInstanceInput
}

input EntityInstanceUpdateInput {
  name: String
  description: String
  game: GameUpdateOneRequiredWithoutInstancesInput
  entity: EntityUpdateOneRequiredWithoutInstancesInput
  fields: EntityInstanceFieldUpdateManyInput
  states: EntityInstanceStateUpdateManyWithoutInstanceInput
}

input EntityInstanceUpdateManyDataInput {
  name: String
  description: String
}

input EntityInstanceUpdateManyMutationInput {
  name: String
  description: String
}

input EntityInstanceUpdateManyWithoutEntityInput {
  create: [EntityInstanceCreateWithoutEntityInput!]
  delete: [EntityInstanceWhereUniqueInput!]
  connect: [EntityInstanceWhereUniqueInput!]
  disconnect: [EntityInstanceWhereUniqueInput!]
  update: [EntityInstanceUpdateWithWhereUniqueWithoutEntityInput!]
  upsert: [EntityInstanceUpsertWithWhereUniqueWithoutEntityInput!]
  deleteMany: [EntityInstanceScalarWhereInput!]
  updateMany: [EntityInstanceUpdateManyWithWhereNestedInput!]
}

input EntityInstanceUpdateManyWithoutGameInput {
  create: [EntityInstanceCreateWithoutGameInput!]
  delete: [EntityInstanceWhereUniqueInput!]
  connect: [EntityInstanceWhereUniqueInput!]
  disconnect: [EntityInstanceWhereUniqueInput!]
  update: [EntityInstanceUpdateWithWhereUniqueWithoutGameInput!]
  upsert: [EntityInstanceUpsertWithWhereUniqueWithoutGameInput!]
  deleteMany: [EntityInstanceScalarWhereInput!]
  updateMany: [EntityInstanceUpdateManyWithWhereNestedInput!]
}

input EntityInstanceUpdateManyWithWhereNestedInput {
  where: EntityInstanceScalarWhereInput!
  data: EntityInstanceUpdateManyDataInput!
}

input EntityInstanceUpdateOneInput {
  create: EntityInstanceCreateInput
  update: EntityInstanceUpdateDataInput
  upsert: EntityInstanceUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityInstanceWhereUniqueInput
}

input EntityInstanceUpdateOneRequiredWithoutStatesInput {
  create: EntityInstanceCreateWithoutStatesInput
  update: EntityInstanceUpdateWithoutStatesDataInput
  upsert: EntityInstanceUpsertWithoutStatesInput
  connect: EntityInstanceWhereUniqueInput
}

input EntityInstanceUpdateWithoutEntityDataInput {
  name: String
  description: String
  game: GameUpdateOneRequiredWithoutInstancesInput
  fields: EntityInstanceFieldUpdateManyInput
  states: EntityInstanceStateUpdateManyWithoutInstanceInput
}

input EntityInstanceUpdateWithoutGameDataInput {
  name: String
  description: String
  entity: EntityUpdateOneRequiredWithoutInstancesInput
  fields: EntityInstanceFieldUpdateManyInput
  states: EntityInstanceStateUpdateManyWithoutInstanceInput
}

input EntityInstanceUpdateWithoutStatesDataInput {
  name: String
  description: String
  game: GameUpdateOneRequiredWithoutInstancesInput
  entity: EntityUpdateOneRequiredWithoutInstancesInput
  fields: EntityInstanceFieldUpdateManyInput
}

input EntityInstanceUpdateWithWhereUniqueWithoutEntityInput {
  where: EntityInstanceWhereUniqueInput!
  data: EntityInstanceUpdateWithoutEntityDataInput!
}

input EntityInstanceUpdateWithWhereUniqueWithoutGameInput {
  where: EntityInstanceWhereUniqueInput!
  data: EntityInstanceUpdateWithoutGameDataInput!
}

input EntityInstanceUpsertNestedInput {
  update: EntityInstanceUpdateDataInput!
  create: EntityInstanceCreateInput!
}

input EntityInstanceUpsertWithoutStatesInput {
  update: EntityInstanceUpdateWithoutStatesDataInput!
  create: EntityInstanceCreateWithoutStatesInput!
}

input EntityInstanceUpsertWithWhereUniqueWithoutEntityInput {
  where: EntityInstanceWhereUniqueInput!
  update: EntityInstanceUpdateWithoutEntityDataInput!
  create: EntityInstanceCreateWithoutEntityInput!
}

input EntityInstanceUpsertWithWhereUniqueWithoutGameInput {
  where: EntityInstanceWhereUniqueInput!
  update: EntityInstanceUpdateWithoutGameDataInput!
  create: EntityInstanceCreateWithoutGameInput!
}

input EntityInstanceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  game: GameWhereInput
  entity: EntityWhereInput
  fields_every: EntityInstanceFieldWhereInput
  fields_some: EntityInstanceFieldWhereInput
  fields_none: EntityInstanceFieldWhereInput
  states_every: EntityInstanceStateWhereInput
  states_some: EntityInstanceStateWhereInput
  states_none: EntityInstanceStateWhereInput
  AND: [EntityInstanceWhereInput!]
  OR: [EntityInstanceWhereInput!]
  NOT: [EntityInstanceWhereInput!]
}

input EntityInstanceWhereUniqueInput {
  id: ID
}

enum EntityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  isTrigger_ASC
  isTrigger_DESC
  isItem_ASC
  isItem_DESC
  isObject_ASC
  isObject_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityPreviousValues {
  id: ID!
  name: String!
  description: String
  isTrigger: Boolean!
  isItem: Boolean!
  isObject: Boolean!
}

type EntityState {
  id: ID!
  name: String!
  description: String
  outgoingTransitions(where: EntityStateTransitionWhereInput, orderBy: EntityStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityStateTransition!]
  incomingTransitions(where: EntityStateTransitionWhereInput, orderBy: EntityStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityStateTransition!]
  entity: Entity!
}

type EntityStateConnection {
  pageInfo: PageInfo!
  edges: [EntityStateEdge]!
  aggregate: AggregateEntityState!
}

input EntityStateCreateInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionCreateManyWithoutFromInput
  incomingTransitions: EntityStateTransitionCreateManyWithoutToInput
  entity: EntityCreateOneWithoutStatesInput!
}

input EntityStateCreateManyWithoutEntityInput {
  create: [EntityStateCreateWithoutEntityInput!]
  connect: [EntityStateWhereUniqueInput!]
}

input EntityStateCreateOneInput {
  create: EntityStateCreateInput
  connect: EntityStateWhereUniqueInput
}

input EntityStateCreateOneWithoutIncomingTransitionsInput {
  create: EntityStateCreateWithoutIncomingTransitionsInput
  connect: EntityStateWhereUniqueInput
}

input EntityStateCreateOneWithoutOutgoingTransitionsInput {
  create: EntityStateCreateWithoutOutgoingTransitionsInput
  connect: EntityStateWhereUniqueInput
}

input EntityStateCreateWithoutEntityInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionCreateManyWithoutFromInput
  incomingTransitions: EntityStateTransitionCreateManyWithoutToInput
}

input EntityStateCreateWithoutIncomingTransitionsInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionCreateManyWithoutFromInput
  entity: EntityCreateOneWithoutStatesInput!
}

input EntityStateCreateWithoutOutgoingTransitionsInput {
  name: String
  description: String
  incomingTransitions: EntityStateTransitionCreateManyWithoutToInput
  entity: EntityCreateOneWithoutStatesInput!
}

type EntityStateEdge {
  node: EntityState!
  cursor: String!
}

enum EntityStateOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityStatePreviousValues {
  id: ID!
  name: String!
  description: String
}

input EntityStateScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [EntityStateScalarWhereInput!]
  OR: [EntityStateScalarWhereInput!]
  NOT: [EntityStateScalarWhereInput!]
}

type EntityStateSubscriptionPayload {
  mutation: MutationType!
  node: EntityState
  updatedFields: [String!]
  previousValues: EntityStatePreviousValues
}

input EntityStateSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityStateWhereInput
  AND: [EntityStateSubscriptionWhereInput!]
  OR: [EntityStateSubscriptionWhereInput!]
  NOT: [EntityStateSubscriptionWhereInput!]
}

type EntityStateTransition {
  id: ID!
  requiredActions(where: ActionRequirementWhereInput, orderBy: ActionRequirementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirement!]
  from: EntityState!
  to: EntityState
}

type EntityStateTransitionConnection {
  pageInfo: PageInfo!
  edges: [EntityStateTransitionEdge]!
  aggregate: AggregateEntityStateTransition!
}

input EntityStateTransitionCreateInput {
  requiredActions: ActionRequirementCreateManyInput
  from: EntityStateCreateOneWithoutOutgoingTransitionsInput!
  to: EntityStateCreateOneWithoutIncomingTransitionsInput
}

input EntityStateTransitionCreateManyWithoutFromInput {
  create: [EntityStateTransitionCreateWithoutFromInput!]
  connect: [EntityStateTransitionWhereUniqueInput!]
}

input EntityStateTransitionCreateManyWithoutToInput {
  create: [EntityStateTransitionCreateWithoutToInput!]
  connect: [EntityStateTransitionWhereUniqueInput!]
}

input EntityStateTransitionCreateWithoutFromInput {
  requiredActions: ActionRequirementCreateManyInput
  to: EntityStateCreateOneWithoutIncomingTransitionsInput
}

input EntityStateTransitionCreateWithoutToInput {
  requiredActions: ActionRequirementCreateManyInput
  from: EntityStateCreateOneWithoutOutgoingTransitionsInput!
}

type EntityStateTransitionEdge {
  node: EntityStateTransition!
  cursor: String!
}

enum EntityStateTransitionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EntityStateTransitionPreviousValues {
  id: ID!
}

input EntityStateTransitionScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [EntityStateTransitionScalarWhereInput!]
  OR: [EntityStateTransitionScalarWhereInput!]
  NOT: [EntityStateTransitionScalarWhereInput!]
}

type EntityStateTransitionSubscriptionPayload {
  mutation: MutationType!
  node: EntityStateTransition
  updatedFields: [String!]
  previousValues: EntityStateTransitionPreviousValues
}

input EntityStateTransitionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityStateTransitionWhereInput
  AND: [EntityStateTransitionSubscriptionWhereInput!]
  OR: [EntityStateTransitionSubscriptionWhereInput!]
  NOT: [EntityStateTransitionSubscriptionWhereInput!]
}

input EntityStateTransitionUpdateInput {
  requiredActions: ActionRequirementUpdateManyInput
  from: EntityStateUpdateOneRequiredWithoutOutgoingTransitionsInput
  to: EntityStateUpdateOneWithoutIncomingTransitionsInput
}

input EntityStateTransitionUpdateManyWithoutFromInput {
  create: [EntityStateTransitionCreateWithoutFromInput!]
  delete: [EntityStateTransitionWhereUniqueInput!]
  connect: [EntityStateTransitionWhereUniqueInput!]
  disconnect: [EntityStateTransitionWhereUniqueInput!]
  update: [EntityStateTransitionUpdateWithWhereUniqueWithoutFromInput!]
  upsert: [EntityStateTransitionUpsertWithWhereUniqueWithoutFromInput!]
  deleteMany: [EntityStateTransitionScalarWhereInput!]
}

input EntityStateTransitionUpdateManyWithoutToInput {
  create: [EntityStateTransitionCreateWithoutToInput!]
  delete: [EntityStateTransitionWhereUniqueInput!]
  connect: [EntityStateTransitionWhereUniqueInput!]
  disconnect: [EntityStateTransitionWhereUniqueInput!]
  update: [EntityStateTransitionUpdateWithWhereUniqueWithoutToInput!]
  upsert: [EntityStateTransitionUpsertWithWhereUniqueWithoutToInput!]
  deleteMany: [EntityStateTransitionScalarWhereInput!]
}

input EntityStateTransitionUpdateWithoutFromDataInput {
  requiredActions: ActionRequirementUpdateManyInput
  to: EntityStateUpdateOneWithoutIncomingTransitionsInput
}

input EntityStateTransitionUpdateWithoutToDataInput {
  requiredActions: ActionRequirementUpdateManyInput
  from: EntityStateUpdateOneRequiredWithoutOutgoingTransitionsInput
}

input EntityStateTransitionUpdateWithWhereUniqueWithoutFromInput {
  where: EntityStateTransitionWhereUniqueInput!
  data: EntityStateTransitionUpdateWithoutFromDataInput!
}

input EntityStateTransitionUpdateWithWhereUniqueWithoutToInput {
  where: EntityStateTransitionWhereUniqueInput!
  data: EntityStateTransitionUpdateWithoutToDataInput!
}

input EntityStateTransitionUpsertWithWhereUniqueWithoutFromInput {
  where: EntityStateTransitionWhereUniqueInput!
  update: EntityStateTransitionUpdateWithoutFromDataInput!
  create: EntityStateTransitionCreateWithoutFromInput!
}

input EntityStateTransitionUpsertWithWhereUniqueWithoutToInput {
  where: EntityStateTransitionWhereUniqueInput!
  update: EntityStateTransitionUpdateWithoutToDataInput!
  create: EntityStateTransitionCreateWithoutToInput!
}

input EntityStateTransitionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  requiredActions_every: ActionRequirementWhereInput
  requiredActions_some: ActionRequirementWhereInput
  requiredActions_none: ActionRequirementWhereInput
  from: EntityStateWhereInput
  to: EntityStateWhereInput
  AND: [EntityStateTransitionWhereInput!]
  OR: [EntityStateTransitionWhereInput!]
  NOT: [EntityStateTransitionWhereInput!]
}

input EntityStateTransitionWhereUniqueInput {
  id: ID
}

input EntityStateUpdateDataInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityStateTransitionUpdateManyWithoutToInput
  entity: EntityUpdateOneRequiredWithoutStatesInput
}

input EntityStateUpdateInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityStateTransitionUpdateManyWithoutToInput
  entity: EntityUpdateOneRequiredWithoutStatesInput
}

input EntityStateUpdateManyDataInput {
  name: String
  description: String
}

input EntityStateUpdateManyMutationInput {
  name: String
  description: String
}

input EntityStateUpdateManyWithoutEntityInput {
  create: [EntityStateCreateWithoutEntityInput!]
  delete: [EntityStateWhereUniqueInput!]
  connect: [EntityStateWhereUniqueInput!]
  disconnect: [EntityStateWhereUniqueInput!]
  update: [EntityStateUpdateWithWhereUniqueWithoutEntityInput!]
  upsert: [EntityStateUpsertWithWhereUniqueWithoutEntityInput!]
  deleteMany: [EntityStateScalarWhereInput!]
  updateMany: [EntityStateUpdateManyWithWhereNestedInput!]
}

input EntityStateUpdateManyWithWhereNestedInput {
  where: EntityStateScalarWhereInput!
  data: EntityStateUpdateManyDataInput!
}

input EntityStateUpdateOneInput {
  create: EntityStateCreateInput
  update: EntityStateUpdateDataInput
  upsert: EntityStateUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityStateWhereUniqueInput
}

input EntityStateUpdateOneRequiredInput {
  create: EntityStateCreateInput
  update: EntityStateUpdateDataInput
  upsert: EntityStateUpsertNestedInput
  connect: EntityStateWhereUniqueInput
}

input EntityStateUpdateOneRequiredWithoutOutgoingTransitionsInput {
  create: EntityStateCreateWithoutOutgoingTransitionsInput
  update: EntityStateUpdateWithoutOutgoingTransitionsDataInput
  upsert: EntityStateUpsertWithoutOutgoingTransitionsInput
  connect: EntityStateWhereUniqueInput
}

input EntityStateUpdateOneWithoutIncomingTransitionsInput {
  create: EntityStateCreateWithoutIncomingTransitionsInput
  update: EntityStateUpdateWithoutIncomingTransitionsDataInput
  upsert: EntityStateUpsertWithoutIncomingTransitionsInput
  delete: Boolean
  disconnect: Boolean
  connect: EntityStateWhereUniqueInput
}

input EntityStateUpdateWithoutEntityDataInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionUpdateManyWithoutFromInput
  incomingTransitions: EntityStateTransitionUpdateManyWithoutToInput
}

input EntityStateUpdateWithoutIncomingTransitionsDataInput {
  name: String
  description: String
  outgoingTransitions: EntityStateTransitionUpdateManyWithoutFromInput
  entity: EntityUpdateOneRequiredWithoutStatesInput
}

input EntityStateUpdateWithoutOutgoingTransitionsDataInput {
  name: String
  description: String
  incomingTransitions: EntityStateTransitionUpdateManyWithoutToInput
  entity: EntityUpdateOneRequiredWithoutStatesInput
}

input EntityStateUpdateWithWhereUniqueWithoutEntityInput {
  where: EntityStateWhereUniqueInput!
  data: EntityStateUpdateWithoutEntityDataInput!
}

input EntityStateUpsertNestedInput {
  update: EntityStateUpdateDataInput!
  create: EntityStateCreateInput!
}

input EntityStateUpsertWithoutIncomingTransitionsInput {
  update: EntityStateUpdateWithoutIncomingTransitionsDataInput!
  create: EntityStateCreateWithoutIncomingTransitionsInput!
}

input EntityStateUpsertWithoutOutgoingTransitionsInput {
  update: EntityStateUpdateWithoutOutgoingTransitionsDataInput!
  create: EntityStateCreateWithoutOutgoingTransitionsInput!
}

input EntityStateUpsertWithWhereUniqueWithoutEntityInput {
  where: EntityStateWhereUniqueInput!
  update: EntityStateUpdateWithoutEntityDataInput!
  create: EntityStateCreateWithoutEntityInput!
}

input EntityStateWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  outgoingTransitions_every: EntityStateTransitionWhereInput
  outgoingTransitions_some: EntityStateTransitionWhereInput
  outgoingTransitions_none: EntityStateTransitionWhereInput
  incomingTransitions_every: EntityStateTransitionWhereInput
  incomingTransitions_some: EntityStateTransitionWhereInput
  incomingTransitions_none: EntityStateTransitionWhereInput
  entity: EntityWhereInput
  AND: [EntityStateWhereInput!]
  OR: [EntityStateWhereInput!]
  NOT: [EntityStateWhereInput!]
}

input EntityStateWhereUniqueInput {
  id: ID
}

type EntitySubscriptionPayload {
  mutation: MutationType!
  node: Entity
  updatedFields: [String!]
  previousValues: EntityPreviousValues
}

input EntitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EntityWhereInput
  AND: [EntitySubscriptionWhereInput!]
  OR: [EntitySubscriptionWhereInput!]
  NOT: [EntitySubscriptionWhereInput!]
}

input EntityUpdateDataInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldUpdateManyWithoutEntityInput
  states: EntityStateUpdateManyWithoutEntityInput
  defaultState: EntityStateUpdateOneInput
  instances: EntityInstanceUpdateManyWithoutEntityInput
}

input EntityUpdateInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldUpdateManyWithoutEntityInput
  states: EntityStateUpdateManyWithoutEntityInput
  defaultState: EntityStateUpdateOneInput
  instances: EntityInstanceUpdateManyWithoutEntityInput
}

input EntityUpdateManyMutationInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
}

input EntityUpdateOneRequiredInput {
  create: EntityCreateInput
  update: EntityUpdateDataInput
  upsert: EntityUpsertNestedInput
  connect: EntityWhereUniqueInput
}

input EntityUpdateOneRequiredWithoutFieldsInput {
  create: EntityCreateWithoutFieldsInput
  update: EntityUpdateWithoutFieldsDataInput
  upsert: EntityUpsertWithoutFieldsInput
  connect: EntityWhereUniqueInput
}

input EntityUpdateOneRequiredWithoutInstancesInput {
  create: EntityCreateWithoutInstancesInput
  update: EntityUpdateWithoutInstancesDataInput
  upsert: EntityUpsertWithoutInstancesInput
  connect: EntityWhereUniqueInput
}

input EntityUpdateOneRequiredWithoutStatesInput {
  create: EntityCreateWithoutStatesInput
  update: EntityUpdateWithoutStatesDataInput
  upsert: EntityUpsertWithoutStatesInput
  connect: EntityWhereUniqueInput
}

input EntityUpdateWithoutFieldsDataInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  states: EntityStateUpdateManyWithoutEntityInput
  defaultState: EntityStateUpdateOneInput
  instances: EntityInstanceUpdateManyWithoutEntityInput
}

input EntityUpdateWithoutInstancesDataInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldUpdateManyWithoutEntityInput
  states: EntityStateUpdateManyWithoutEntityInput
  defaultState: EntityStateUpdateOneInput
}

input EntityUpdateWithoutStatesDataInput {
  name: String
  description: String
  isTrigger: Boolean
  isItem: Boolean
  isObject: Boolean
  fields: EntityFieldUpdateManyWithoutEntityInput
  defaultState: EntityStateUpdateOneInput
  instances: EntityInstanceUpdateManyWithoutEntityInput
}

input EntityUpsertNestedInput {
  update: EntityUpdateDataInput!
  create: EntityCreateInput!
}

input EntityUpsertWithoutFieldsInput {
  update: EntityUpdateWithoutFieldsDataInput!
  create: EntityCreateWithoutFieldsInput!
}

input EntityUpsertWithoutInstancesInput {
  update: EntityUpdateWithoutInstancesDataInput!
  create: EntityCreateWithoutInstancesInput!
}

input EntityUpsertWithoutStatesInput {
  update: EntityUpdateWithoutStatesDataInput!
  create: EntityCreateWithoutStatesInput!
}

input EntityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isTrigger: Boolean
  isTrigger_not: Boolean
  isItem: Boolean
  isItem_not: Boolean
  isObject: Boolean
  isObject_not: Boolean
  fields_every: EntityFieldWhereInput
  fields_some: EntityFieldWhereInput
  fields_none: EntityFieldWhereInput
  states_every: EntityStateWhereInput
  states_some: EntityStateWhereInput
  states_none: EntityStateWhereInput
  defaultState: EntityStateWhereInput
  instances_every: EntityInstanceWhereInput
  instances_some: EntityInstanceWhereInput
  instances_none: EntityInstanceWhereInput
  AND: [EntityWhereInput!]
  OR: [EntityWhereInput!]
  NOT: [EntityWhereInput!]
}

input EntityWhereUniqueInput {
  id: ID
}

enum FieldType {
  STRING
  NUMBER
  BOOLEAN
  TIMESTAMP
  GEOPOINT
}

type Game {
  id: ID!
  name: String!
  slug: String!
  description: String
  creator: User
  instances(where: EntityInstanceWhereInput, orderBy: EntityInstanceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstance!]
  plays(where: GamePlayWhereInput, orderBy: GamePlayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GamePlay!]
}

type GameConnection {
  pageInfo: PageInfo!
  edges: [GameEdge]!
  aggregate: AggregateGame!
}

input GameCreateInput {
  name: String!
  slug: String!
  description: String
  creator: UserCreateOneWithoutGamesInput
  instances: EntityInstanceCreateManyWithoutGameInput
  plays: GamePlayCreateManyWithoutGameInput
}

input GameCreateManyWithoutCreatorInput {
  create: [GameCreateWithoutCreatorInput!]
  connect: [GameWhereUniqueInput!]
}

input GameCreateOneWithoutInstancesInput {
  create: GameCreateWithoutInstancesInput
  connect: GameWhereUniqueInput
}

input GameCreateOneWithoutPlaysInput {
  create: GameCreateWithoutPlaysInput
  connect: GameWhereUniqueInput
}

input GameCreateWithoutCreatorInput {
  name: String!
  slug: String!
  description: String
  instances: EntityInstanceCreateManyWithoutGameInput
  plays: GamePlayCreateManyWithoutGameInput
}

input GameCreateWithoutInstancesInput {
  name: String!
  slug: String!
  description: String
  creator: UserCreateOneWithoutGamesInput
  plays: GamePlayCreateManyWithoutGameInput
}

input GameCreateWithoutPlaysInput {
  name: String!
  slug: String!
  description: String
  creator: UserCreateOneWithoutGamesInput
  instances: EntityInstanceCreateManyWithoutGameInput
}

type GameEdge {
  node: Game!
  cursor: String!
}

enum GameOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  slug_ASC
  slug_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GamePlay {
  id: ID!
  game: Game!
  player: User
  actions(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Action!]
}

type GamePlayConnection {
  pageInfo: PageInfo!
  edges: [GamePlayEdge]!
  aggregate: AggregateGamePlay!
}

input GamePlayCreateInput {
  game: GameCreateOneWithoutPlaysInput!
  player: UserCreateOneWithoutPlaysInput
  actions: ActionCreateManyWithoutGamePlayInput
}

input GamePlayCreateManyWithoutGameInput {
  create: [GamePlayCreateWithoutGameInput!]
  connect: [GamePlayWhereUniqueInput!]
}

input GamePlayCreateManyWithoutPlayerInput {
  create: [GamePlayCreateWithoutPlayerInput!]
  connect: [GamePlayWhereUniqueInput!]
}

input GamePlayCreateOneWithoutActionsInput {
  create: GamePlayCreateWithoutActionsInput
  connect: GamePlayWhereUniqueInput
}

input GamePlayCreateWithoutActionsInput {
  game: GameCreateOneWithoutPlaysInput!
  player: UserCreateOneWithoutPlaysInput
}

input GamePlayCreateWithoutGameInput {
  player: UserCreateOneWithoutPlaysInput
  actions: ActionCreateManyWithoutGamePlayInput
}

input GamePlayCreateWithoutPlayerInput {
  game: GameCreateOneWithoutPlaysInput!
  actions: ActionCreateManyWithoutGamePlayInput
}

type GamePlayEdge {
  node: GamePlay!
  cursor: String!
}

enum GamePlayOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type GamePlayPreviousValues {
  id: ID!
}

input GamePlayScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [GamePlayScalarWhereInput!]
  OR: [GamePlayScalarWhereInput!]
  NOT: [GamePlayScalarWhereInput!]
}

type GamePlaySubscriptionPayload {
  mutation: MutationType!
  node: GamePlay
  updatedFields: [String!]
  previousValues: GamePlayPreviousValues
}

input GamePlaySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GamePlayWhereInput
  AND: [GamePlaySubscriptionWhereInput!]
  OR: [GamePlaySubscriptionWhereInput!]
  NOT: [GamePlaySubscriptionWhereInput!]
}

input GamePlayUpdateInput {
  game: GameUpdateOneRequiredWithoutPlaysInput
  player: UserUpdateOneWithoutPlaysInput
  actions: ActionUpdateManyWithoutGamePlayInput
}

input GamePlayUpdateManyWithoutGameInput {
  create: [GamePlayCreateWithoutGameInput!]
  delete: [GamePlayWhereUniqueInput!]
  connect: [GamePlayWhereUniqueInput!]
  disconnect: [GamePlayWhereUniqueInput!]
  update: [GamePlayUpdateWithWhereUniqueWithoutGameInput!]
  upsert: [GamePlayUpsertWithWhereUniqueWithoutGameInput!]
  deleteMany: [GamePlayScalarWhereInput!]
}

input GamePlayUpdateManyWithoutPlayerInput {
  create: [GamePlayCreateWithoutPlayerInput!]
  delete: [GamePlayWhereUniqueInput!]
  connect: [GamePlayWhereUniqueInput!]
  disconnect: [GamePlayWhereUniqueInput!]
  update: [GamePlayUpdateWithWhereUniqueWithoutPlayerInput!]
  upsert: [GamePlayUpsertWithWhereUniqueWithoutPlayerInput!]
  deleteMany: [GamePlayScalarWhereInput!]
}

input GamePlayUpdateOneRequiredWithoutActionsInput {
  create: GamePlayCreateWithoutActionsInput
  update: GamePlayUpdateWithoutActionsDataInput
  upsert: GamePlayUpsertWithoutActionsInput
  connect: GamePlayWhereUniqueInput
}

input GamePlayUpdateWithoutActionsDataInput {
  game: GameUpdateOneRequiredWithoutPlaysInput
  player: UserUpdateOneWithoutPlaysInput
}

input GamePlayUpdateWithoutGameDataInput {
  player: UserUpdateOneWithoutPlaysInput
  actions: ActionUpdateManyWithoutGamePlayInput
}

input GamePlayUpdateWithoutPlayerDataInput {
  game: GameUpdateOneRequiredWithoutPlaysInput
  actions: ActionUpdateManyWithoutGamePlayInput
}

input GamePlayUpdateWithWhereUniqueWithoutGameInput {
  where: GamePlayWhereUniqueInput!
  data: GamePlayUpdateWithoutGameDataInput!
}

input GamePlayUpdateWithWhereUniqueWithoutPlayerInput {
  where: GamePlayWhereUniqueInput!
  data: GamePlayUpdateWithoutPlayerDataInput!
}

input GamePlayUpsertWithoutActionsInput {
  update: GamePlayUpdateWithoutActionsDataInput!
  create: GamePlayCreateWithoutActionsInput!
}

input GamePlayUpsertWithWhereUniqueWithoutGameInput {
  where: GamePlayWhereUniqueInput!
  update: GamePlayUpdateWithoutGameDataInput!
  create: GamePlayCreateWithoutGameInput!
}

input GamePlayUpsertWithWhereUniqueWithoutPlayerInput {
  where: GamePlayWhereUniqueInput!
  update: GamePlayUpdateWithoutPlayerDataInput!
  create: GamePlayCreateWithoutPlayerInput!
}

input GamePlayWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  game: GameWhereInput
  player: UserWhereInput
  actions_every: ActionWhereInput
  actions_some: ActionWhereInput
  actions_none: ActionWhereInput
  AND: [GamePlayWhereInput!]
  OR: [GamePlayWhereInput!]
  NOT: [GamePlayWhereInput!]
}

input GamePlayWhereUniqueInput {
  id: ID
}

type GamePreviousValues {
  id: ID!
  name: String!
  slug: String!
  description: String
}

input GameScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [GameScalarWhereInput!]
  OR: [GameScalarWhereInput!]
  NOT: [GameScalarWhereInput!]
}

type GameSubscriptionPayload {
  mutation: MutationType!
  node: Game
  updatedFields: [String!]
  previousValues: GamePreviousValues
}

input GameSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GameWhereInput
  AND: [GameSubscriptionWhereInput!]
  OR: [GameSubscriptionWhereInput!]
  NOT: [GameSubscriptionWhereInput!]
}

input GameUpdateInput {
  name: String
  slug: String
  description: String
  creator: UserUpdateOneWithoutGamesInput
  instances: EntityInstanceUpdateManyWithoutGameInput
  plays: GamePlayUpdateManyWithoutGameInput
}

input GameUpdateManyDataInput {
  name: String
  slug: String
  description: String
}

input GameUpdateManyMutationInput {
  name: String
  slug: String
  description: String
}

input GameUpdateManyWithoutCreatorInput {
  create: [GameCreateWithoutCreatorInput!]
  delete: [GameWhereUniqueInput!]
  connect: [GameWhereUniqueInput!]
  disconnect: [GameWhereUniqueInput!]
  update: [GameUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [GameUpsertWithWhereUniqueWithoutCreatorInput!]
  deleteMany: [GameScalarWhereInput!]
  updateMany: [GameUpdateManyWithWhereNestedInput!]
}

input GameUpdateManyWithWhereNestedInput {
  where: GameScalarWhereInput!
  data: GameUpdateManyDataInput!
}

input GameUpdateOneRequiredWithoutInstancesInput {
  create: GameCreateWithoutInstancesInput
  update: GameUpdateWithoutInstancesDataInput
  upsert: GameUpsertWithoutInstancesInput
  connect: GameWhereUniqueInput
}

input GameUpdateOneRequiredWithoutPlaysInput {
  create: GameCreateWithoutPlaysInput
  update: GameUpdateWithoutPlaysDataInput
  upsert: GameUpsertWithoutPlaysInput
  connect: GameWhereUniqueInput
}

input GameUpdateWithoutCreatorDataInput {
  name: String
  slug: String
  description: String
  instances: EntityInstanceUpdateManyWithoutGameInput
  plays: GamePlayUpdateManyWithoutGameInput
}

input GameUpdateWithoutInstancesDataInput {
  name: String
  slug: String
  description: String
  creator: UserUpdateOneWithoutGamesInput
  plays: GamePlayUpdateManyWithoutGameInput
}

input GameUpdateWithoutPlaysDataInput {
  name: String
  slug: String
  description: String
  creator: UserUpdateOneWithoutGamesInput
  instances: EntityInstanceUpdateManyWithoutGameInput
}

input GameUpdateWithWhereUniqueWithoutCreatorInput {
  where: GameWhereUniqueInput!
  data: GameUpdateWithoutCreatorDataInput!
}

input GameUpsertWithoutInstancesInput {
  update: GameUpdateWithoutInstancesDataInput!
  create: GameCreateWithoutInstancesInput!
}

input GameUpsertWithoutPlaysInput {
  update: GameUpdateWithoutPlaysDataInput!
  create: GameCreateWithoutPlaysInput!
}

input GameUpsertWithWhereUniqueWithoutCreatorInput {
  where: GameWhereUniqueInput!
  update: GameUpdateWithoutCreatorDataInput!
  create: GameCreateWithoutCreatorInput!
}

input GameWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  creator: UserWhereInput
  instances_every: EntityInstanceWhereInput
  instances_some: EntityInstanceWhereInput
  instances_none: EntityInstanceWhereInput
  plays_every: GamePlayWhereInput
  plays_some: GamePlayWhereInput
  plays_none: GamePlayWhereInput
  AND: [GameWhereInput!]
  OR: [GameWhereInput!]
  NOT: [GameWhereInput!]
}

input GameWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createAction(data: ActionCreateInput!): Action!
  updateAction(data: ActionUpdateInput!, where: ActionWhereUniqueInput!): Action
  updateManyActions(data: ActionUpdateManyMutationInput!, where: ActionWhereInput): BatchPayload!
  upsertAction(where: ActionWhereUniqueInput!, create: ActionCreateInput!, update: ActionUpdateInput!): Action!
  deleteAction(where: ActionWhereUniqueInput!): Action
  deleteManyActions(where: ActionWhereInput): BatchPayload!
  createActionPayload(data: ActionPayloadCreateInput!): ActionPayload!
  updateActionPayload(data: ActionPayloadUpdateInput!, where: ActionPayloadWhereUniqueInput!): ActionPayload
  upsertActionPayload(where: ActionPayloadWhereUniqueInput!, create: ActionPayloadCreateInput!, update: ActionPayloadUpdateInput!): ActionPayload!
  deleteActionPayload(where: ActionPayloadWhereUniqueInput!): ActionPayload
  deleteManyActionPayloads(where: ActionPayloadWhereInput): BatchPayload!
  createActionPayloadInputValue(data: ActionPayloadInputValueCreateInput!): ActionPayloadInputValue!
  updateActionPayloadInputValue(data: ActionPayloadInputValueUpdateInput!, where: ActionPayloadInputValueWhereUniqueInput!): ActionPayloadInputValue
  updateManyActionPayloadInputValues(data: ActionPayloadInputValueUpdateManyMutationInput!, where: ActionPayloadInputValueWhereInput): BatchPayload!
  upsertActionPayloadInputValue(where: ActionPayloadInputValueWhereUniqueInput!, create: ActionPayloadInputValueCreateInput!, update: ActionPayloadInputValueUpdateInput!): ActionPayloadInputValue!
  deleteActionPayloadInputValue(where: ActionPayloadInputValueWhereUniqueInput!): ActionPayloadInputValue
  deleteManyActionPayloadInputValues(where: ActionPayloadInputValueWhereInput): BatchPayload!
  createActionRequirement(data: ActionRequirementCreateInput!): ActionRequirement!
  updateActionRequirement(data: ActionRequirementUpdateInput!, where: ActionRequirementWhereUniqueInput!): ActionRequirement
  updateManyActionRequirements(data: ActionRequirementUpdateManyMutationInput!, where: ActionRequirementWhereInput): BatchPayload!
  upsertActionRequirement(where: ActionRequirementWhereUniqueInput!, create: ActionRequirementCreateInput!, update: ActionRequirementUpdateInput!): ActionRequirement!
  deleteActionRequirement(where: ActionRequirementWhereUniqueInput!): ActionRequirement
  deleteManyActionRequirements(where: ActionRequirementWhereInput): BatchPayload!
  createActionRequirementPayload(data: ActionRequirementPayloadCreateInput!): ActionRequirementPayload!
  updateActionRequirementPayload(data: ActionRequirementPayloadUpdateInput!, where: ActionRequirementPayloadWhereUniqueInput!): ActionRequirementPayload
  upsertActionRequirementPayload(where: ActionRequirementPayloadWhereUniqueInput!, create: ActionRequirementPayloadCreateInput!, update: ActionRequirementPayloadUpdateInput!): ActionRequirementPayload!
  deleteActionRequirementPayload(where: ActionRequirementPayloadWhereUniqueInput!): ActionRequirementPayload
  deleteManyActionRequirementPayloads(where: ActionRequirementPayloadWhereInput): BatchPayload!
  createActionRequirementPayloadEntity(data: ActionRequirementPayloadEntityCreateInput!): ActionRequirementPayloadEntity!
  updateActionRequirementPayloadEntity(data: ActionRequirementPayloadEntityUpdateInput!, where: ActionRequirementPayloadEntityWhereUniqueInput!): ActionRequirementPayloadEntity
  upsertActionRequirementPayloadEntity(where: ActionRequirementPayloadEntityWhereUniqueInput!, create: ActionRequirementPayloadEntityCreateInput!, update: ActionRequirementPayloadEntityUpdateInput!): ActionRequirementPayloadEntity!
  deleteActionRequirementPayloadEntity(where: ActionRequirementPayloadEntityWhereUniqueInput!): ActionRequirementPayloadEntity
  deleteManyActionRequirementPayloadEntities(where: ActionRequirementPayloadEntityWhereInput): BatchPayload!
  createActionRequirementPayloadInputValue(data: ActionRequirementPayloadInputValueCreateInput!): ActionRequirementPayloadInputValue!
  updateActionRequirementPayloadInputValue(data: ActionRequirementPayloadInputValueUpdateInput!, where: ActionRequirementPayloadInputValueWhereUniqueInput!): ActionRequirementPayloadInputValue
  updateManyActionRequirementPayloadInputValues(data: ActionRequirementPayloadInputValueUpdateManyMutationInput!, where: ActionRequirementPayloadInputValueWhereInput): BatchPayload!
  upsertActionRequirementPayloadInputValue(where: ActionRequirementPayloadInputValueWhereUniqueInput!, create: ActionRequirementPayloadInputValueCreateInput!, update: ActionRequirementPayloadInputValueUpdateInput!): ActionRequirementPayloadInputValue!
  deleteActionRequirementPayloadInputValue(where: ActionRequirementPayloadInputValueWhereUniqueInput!): ActionRequirementPayloadInputValue
  deleteManyActionRequirementPayloadInputValues(where: ActionRequirementPayloadInputValueWhereInput): BatchPayload!
  createEntity(data: EntityCreateInput!): Entity!
  updateEntity(data: EntityUpdateInput!, where: EntityWhereUniqueInput!): Entity
  updateManyEntities(data: EntityUpdateManyMutationInput!, where: EntityWhereInput): BatchPayload!
  upsertEntity(where: EntityWhereUniqueInput!, create: EntityCreateInput!, update: EntityUpdateInput!): Entity!
  deleteEntity(where: EntityWhereUniqueInput!): Entity
  deleteManyEntities(where: EntityWhereInput): BatchPayload!
  createEntityField(data: EntityFieldCreateInput!): EntityField!
  updateEntityField(data: EntityFieldUpdateInput!, where: EntityFieldWhereUniqueInput!): EntityField
  updateManyEntityFields(data: EntityFieldUpdateManyMutationInput!, where: EntityFieldWhereInput): BatchPayload!
  upsertEntityField(where: EntityFieldWhereUniqueInput!, create: EntityFieldCreateInput!, update: EntityFieldUpdateInput!): EntityField!
  deleteEntityField(where: EntityFieldWhereUniqueInput!): EntityField
  deleteManyEntityFields(where: EntityFieldWhereInput): BatchPayload!
  createEntityInstance(data: EntityInstanceCreateInput!): EntityInstance!
  updateEntityInstance(data: EntityInstanceUpdateInput!, where: EntityInstanceWhereUniqueInput!): EntityInstance
  updateManyEntityInstances(data: EntityInstanceUpdateManyMutationInput!, where: EntityInstanceWhereInput): BatchPayload!
  upsertEntityInstance(where: EntityInstanceWhereUniqueInput!, create: EntityInstanceCreateInput!, update: EntityInstanceUpdateInput!): EntityInstance!
  deleteEntityInstance(where: EntityInstanceWhereUniqueInput!): EntityInstance
  deleteManyEntityInstances(where: EntityInstanceWhereInput): BatchPayload!
  createEntityInstanceField(data: EntityInstanceFieldCreateInput!): EntityInstanceField!
  updateEntityInstanceField(data: EntityInstanceFieldUpdateInput!, where: EntityInstanceFieldWhereUniqueInput!): EntityInstanceField
  updateManyEntityInstanceFields(data: EntityInstanceFieldUpdateManyMutationInput!, where: EntityInstanceFieldWhereInput): BatchPayload!
  upsertEntityInstanceField(where: EntityInstanceFieldWhereUniqueInput!, create: EntityInstanceFieldCreateInput!, update: EntityInstanceFieldUpdateInput!): EntityInstanceField!
  deleteEntityInstanceField(where: EntityInstanceFieldWhereUniqueInput!): EntityInstanceField
  deleteManyEntityInstanceFields(where: EntityInstanceFieldWhereInput): BatchPayload!
  createEntityInstanceState(data: EntityInstanceStateCreateInput!): EntityInstanceState!
  updateEntityInstanceState(data: EntityInstanceStateUpdateInput!, where: EntityInstanceStateWhereUniqueInput!): EntityInstanceState
  upsertEntityInstanceState(where: EntityInstanceStateWhereUniqueInput!, create: EntityInstanceStateCreateInput!, update: EntityInstanceStateUpdateInput!): EntityInstanceState!
  deleteEntityInstanceState(where: EntityInstanceStateWhereUniqueInput!): EntityInstanceState
  deleteManyEntityInstanceStates(where: EntityInstanceStateWhereInput): BatchPayload!
  createEntityInstanceStateTransition(data: EntityInstanceStateTransitionCreateInput!): EntityInstanceStateTransition!
  updateEntityInstanceStateTransition(data: EntityInstanceStateTransitionUpdateInput!, where: EntityInstanceStateTransitionWhereUniqueInput!): EntityInstanceStateTransition
  upsertEntityInstanceStateTransition(where: EntityInstanceStateTransitionWhereUniqueInput!, create: EntityInstanceStateTransitionCreateInput!, update: EntityInstanceStateTransitionUpdateInput!): EntityInstanceStateTransition!
  deleteEntityInstanceStateTransition(where: EntityInstanceStateTransitionWhereUniqueInput!): EntityInstanceStateTransition
  deleteManyEntityInstanceStateTransitions(where: EntityInstanceStateTransitionWhereInput): BatchPayload!
  createEntityState(data: EntityStateCreateInput!): EntityState!
  updateEntityState(data: EntityStateUpdateInput!, where: EntityStateWhereUniqueInput!): EntityState
  updateManyEntityStates(data: EntityStateUpdateManyMutationInput!, where: EntityStateWhereInput): BatchPayload!
  upsertEntityState(where: EntityStateWhereUniqueInput!, create: EntityStateCreateInput!, update: EntityStateUpdateInput!): EntityState!
  deleteEntityState(where: EntityStateWhereUniqueInput!): EntityState
  deleteManyEntityStates(where: EntityStateWhereInput): BatchPayload!
  createEntityStateTransition(data: EntityStateTransitionCreateInput!): EntityStateTransition!
  updateEntityStateTransition(data: EntityStateTransitionUpdateInput!, where: EntityStateTransitionWhereUniqueInput!): EntityStateTransition
  upsertEntityStateTransition(where: EntityStateTransitionWhereUniqueInput!, create: EntityStateTransitionCreateInput!, update: EntityStateTransitionUpdateInput!): EntityStateTransition!
  deleteEntityStateTransition(where: EntityStateTransitionWhereUniqueInput!): EntityStateTransition
  deleteManyEntityStateTransitions(where: EntityStateTransitionWhereInput): BatchPayload!
  createGame(data: GameCreateInput!): Game!
  updateGame(data: GameUpdateInput!, where: GameWhereUniqueInput!): Game
  updateManyGames(data: GameUpdateManyMutationInput!, where: GameWhereInput): BatchPayload!
  upsertGame(where: GameWhereUniqueInput!, create: GameCreateInput!, update: GameUpdateInput!): Game!
  deleteGame(where: GameWhereUniqueInput!): Game
  deleteManyGames(where: GameWhereInput): BatchPayload!
  createGamePlay(data: GamePlayCreateInput!): GamePlay!
  updateGamePlay(data: GamePlayUpdateInput!, where: GamePlayWhereUniqueInput!): GamePlay
  upsertGamePlay(where: GamePlayWhereUniqueInput!, create: GamePlayCreateInput!, update: GamePlayUpdateInput!): GamePlay!
  deleteGamePlay(where: GamePlayWhereUniqueInput!): GamePlay
  deleteManyGamePlays(where: GamePlayWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  action(where: ActionWhereUniqueInput!): Action
  actions(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Action]!
  actionsConnection(where: ActionWhereInput, orderBy: ActionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionConnection!
  actionPayload(where: ActionPayloadWhereUniqueInput!): ActionPayload
  actionPayloads(where: ActionPayloadWhereInput, orderBy: ActionPayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionPayload]!
  actionPayloadsConnection(where: ActionPayloadWhereInput, orderBy: ActionPayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionPayloadConnection!
  actionPayloadInputValue(where: ActionPayloadInputValueWhereUniqueInput!): ActionPayloadInputValue
  actionPayloadInputValues(where: ActionPayloadInputValueWhereInput, orderBy: ActionPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionPayloadInputValue]!
  actionPayloadInputValuesConnection(where: ActionPayloadInputValueWhereInput, orderBy: ActionPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionPayloadInputValueConnection!
  actionRequirement(where: ActionRequirementWhereUniqueInput!): ActionRequirement
  actionRequirements(where: ActionRequirementWhereInput, orderBy: ActionRequirementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirement]!
  actionRequirementsConnection(where: ActionRequirementWhereInput, orderBy: ActionRequirementOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionRequirementConnection!
  actionRequirementPayload(where: ActionRequirementPayloadWhereUniqueInput!): ActionRequirementPayload
  actionRequirementPayloads(where: ActionRequirementPayloadWhereInput, orderBy: ActionRequirementPayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirementPayload]!
  actionRequirementPayloadsConnection(where: ActionRequirementPayloadWhereInput, orderBy: ActionRequirementPayloadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionRequirementPayloadConnection!
  actionRequirementPayloadEntity(where: ActionRequirementPayloadEntityWhereUniqueInput!): ActionRequirementPayloadEntity
  actionRequirementPayloadEntities(where: ActionRequirementPayloadEntityWhereInput, orderBy: ActionRequirementPayloadEntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirementPayloadEntity]!
  actionRequirementPayloadEntitiesConnection(where: ActionRequirementPayloadEntityWhereInput, orderBy: ActionRequirementPayloadEntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionRequirementPayloadEntityConnection!
  actionRequirementPayloadInputValue(where: ActionRequirementPayloadInputValueWhereUniqueInput!): ActionRequirementPayloadInputValue
  actionRequirementPayloadInputValues(where: ActionRequirementPayloadInputValueWhereInput, orderBy: ActionRequirementPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActionRequirementPayloadInputValue]!
  actionRequirementPayloadInputValuesConnection(where: ActionRequirementPayloadInputValueWhereInput, orderBy: ActionRequirementPayloadInputValueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActionRequirementPayloadInputValueConnection!
  entity(where: EntityWhereUniqueInput!): Entity
  entities(where: EntityWhereInput, orderBy: EntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Entity]!
  entitiesConnection(where: EntityWhereInput, orderBy: EntityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityConnection!
  entityField(where: EntityFieldWhereUniqueInput!): EntityField
  entityFields(where: EntityFieldWhereInput, orderBy: EntityFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityField]!
  entityFieldsConnection(where: EntityFieldWhereInput, orderBy: EntityFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityFieldConnection!
  entityInstance(where: EntityInstanceWhereUniqueInput!): EntityInstance
  entityInstances(where: EntityInstanceWhereInput, orderBy: EntityInstanceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstance]!
  entityInstancesConnection(where: EntityInstanceWhereInput, orderBy: EntityInstanceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityInstanceConnection!
  entityInstanceField(where: EntityInstanceFieldWhereUniqueInput!): EntityInstanceField
  entityInstanceFields(where: EntityInstanceFieldWhereInput, orderBy: EntityInstanceFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceField]!
  entityInstanceFieldsConnection(where: EntityInstanceFieldWhereInput, orderBy: EntityInstanceFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityInstanceFieldConnection!
  entityInstanceState(where: EntityInstanceStateWhereUniqueInput!): EntityInstanceState
  entityInstanceStates(where: EntityInstanceStateWhereInput, orderBy: EntityInstanceStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceState]!
  entityInstanceStatesConnection(where: EntityInstanceStateWhereInput, orderBy: EntityInstanceStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityInstanceStateConnection!
  entityInstanceStateTransition(where: EntityInstanceStateTransitionWhereUniqueInput!): EntityInstanceStateTransition
  entityInstanceStateTransitions(where: EntityInstanceStateTransitionWhereInput, orderBy: EntityInstanceStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityInstanceStateTransition]!
  entityInstanceStateTransitionsConnection(where: EntityInstanceStateTransitionWhereInput, orderBy: EntityInstanceStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityInstanceStateTransitionConnection!
  entityState(where: EntityStateWhereUniqueInput!): EntityState
  entityStates(where: EntityStateWhereInput, orderBy: EntityStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityState]!
  entityStatesConnection(where: EntityStateWhereInput, orderBy: EntityStateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityStateConnection!
  entityStateTransition(where: EntityStateTransitionWhereUniqueInput!): EntityStateTransition
  entityStateTransitions(where: EntityStateTransitionWhereInput, orderBy: EntityStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [EntityStateTransition]!
  entityStateTransitionsConnection(where: EntityStateTransitionWhereInput, orderBy: EntityStateTransitionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EntityStateTransitionConnection!
  game(where: GameWhereUniqueInput!): Game
  games(where: GameWhereInput, orderBy: GameOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Game]!
  gamesConnection(where: GameWhereInput, orderBy: GameOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GameConnection!
  gamePlay(where: GamePlayWhereUniqueInput!): GamePlay
  gamePlays(where: GamePlayWhereInput, orderBy: GamePlayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GamePlay]!
  gamePlaysConnection(where: GamePlayWhereInput, orderBy: GamePlayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GamePlayConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  action(where: ActionSubscriptionWhereInput): ActionSubscriptionPayload
  actionPayload(where: ActionPayloadSubscriptionWhereInput): ActionPayloadSubscriptionPayload
  actionPayloadInputValue(where: ActionPayloadInputValueSubscriptionWhereInput): ActionPayloadInputValueSubscriptionPayload
  actionRequirement(where: ActionRequirementSubscriptionWhereInput): ActionRequirementSubscriptionPayload
  actionRequirementPayload(where: ActionRequirementPayloadSubscriptionWhereInput): ActionRequirementPayloadSubscriptionPayload
  actionRequirementPayloadEntity(where: ActionRequirementPayloadEntitySubscriptionWhereInput): ActionRequirementPayloadEntitySubscriptionPayload
  actionRequirementPayloadInputValue(where: ActionRequirementPayloadInputValueSubscriptionWhereInput): ActionRequirementPayloadInputValueSubscriptionPayload
  entity(where: EntitySubscriptionWhereInput): EntitySubscriptionPayload
  entityField(where: EntityFieldSubscriptionWhereInput): EntityFieldSubscriptionPayload
  entityInstance(where: EntityInstanceSubscriptionWhereInput): EntityInstanceSubscriptionPayload
  entityInstanceField(where: EntityInstanceFieldSubscriptionWhereInput): EntityInstanceFieldSubscriptionPayload
  entityInstanceState(where: EntityInstanceStateSubscriptionWhereInput): EntityInstanceStateSubscriptionPayload
  entityInstanceStateTransition(where: EntityInstanceStateTransitionSubscriptionWhereInput): EntityInstanceStateTransitionSubscriptionPayload
  entityState(where: EntityStateSubscriptionWhereInput): EntityStateSubscriptionPayload
  entityStateTransition(where: EntityStateTransitionSubscriptionWhereInput): EntityStateTransitionSubscriptionPayload
  game(where: GameSubscriptionWhereInput): GameSubscriptionPayload
  gamePlay(where: GamePlaySubscriptionWhereInput): GamePlaySubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  slug: String!
  games(where: GameWhereInput, orderBy: GameOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Game!]
  plays(where: GamePlayWhereInput, orderBy: GamePlayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GamePlay!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  slug: String!
  games: GameCreateManyWithoutCreatorInput
  plays: GamePlayCreateManyWithoutPlayerInput
}

input UserCreateOneWithoutGamesInput {
  create: UserCreateWithoutGamesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPlaysInput {
  create: UserCreateWithoutPlaysInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutGamesInput {
  name: String!
  slug: String!
  plays: GamePlayCreateManyWithoutPlayerInput
}

input UserCreateWithoutPlaysInput {
  name: String!
  slug: String!
  games: GameCreateManyWithoutCreatorInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  slug_ASC
  slug_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  slug: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  slug: String
  games: GameUpdateManyWithoutCreatorInput
  plays: GamePlayUpdateManyWithoutPlayerInput
}

input UserUpdateManyMutationInput {
  name: String
  slug: String
}

input UserUpdateOneWithoutGamesInput {
  create: UserCreateWithoutGamesInput
  update: UserUpdateWithoutGamesDataInput
  upsert: UserUpsertWithoutGamesInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutPlaysInput {
  create: UserCreateWithoutPlaysInput
  update: UserUpdateWithoutPlaysDataInput
  upsert: UserUpsertWithoutPlaysInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutGamesDataInput {
  name: String
  slug: String
  plays: GamePlayUpdateManyWithoutPlayerInput
}

input UserUpdateWithoutPlaysDataInput {
  name: String
  slug: String
  games: GameUpdateManyWithoutCreatorInput
}

input UserUpsertWithoutGamesInput {
  update: UserUpdateWithoutGamesDataInput!
  create: UserCreateWithoutGamesInput!
}

input UserUpsertWithoutPlaysInput {
  update: UserUpdateWithoutPlaysDataInput!
  create: UserCreateWithoutPlaysInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  slug: String
  slug_not: String
  slug_in: [String!]
  slug_not_in: [String!]
  slug_lt: String
  slug_lte: String
  slug_gt: String
  slug_gte: String
  slug_contains: String
  slug_not_contains: String
  slug_starts_with: String
  slug_not_starts_with: String
  slug_ends_with: String
  slug_not_ends_with: String
  games_every: GameWhereInput
  games_some: GameWhereInput
  games_none: GameWhereInput
  plays_every: GamePlayWhereInput
  plays_some: GamePlayWhereInput
  plays_none: GamePlayWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
