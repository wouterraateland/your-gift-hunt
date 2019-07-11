import { createInputAction, createUseAction } from "../actionCreators"

test("createInputAction to produce an input action", () => {
  expect(
    createInputAction({ id: 10 }, [{ key: "a", value: "b" }])
  ).toStrictEqual({
    type: "INPUT",
    payload: {
      source: { id: 10 },
      inputValues: [{ key: "a", value: '"b"' }]
    }
  })
})
