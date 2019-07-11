export const createPersistentStoreCreator = ({
  serialize,
  deserialize,
  load,
  save
}) => ({ name = "store", persistKey = () => true }) => ({
  initialState: deserialize(load(name)),
  enhancer: state => {
    save(name)(
      serialize(
        Object.keys(state)
          .filter(persistKey)
          .reduce((acc, key) => ({ ...acc, [key]: state[key] }), {})
      )
    )
    return state
  }
})

export const localStorageStoreCreator = createPersistentStoreCreator({
  serialize: JSON.stringify,
  deserialize: JSON.parse,
  load: key => window.localStorage.getItem(key) || "{}",
  save: key => value => window.localStorage.setItem(key, value)
})
