import { createPersistentStoreCreator } from 'hooks/useStore'

const localStorageStoreCreator = createPersistentStoreCreator({
  serialize: JSON.stringify,
  deserialize: JSON.parse,
  load: key => window.localStorage.getItem(key),
  save: (key, value) => window.localStorage.setItem(key, value),
})

const store = localStorageStoreCreator({
  name: 'store',
  persistKey: key => !['selectedPieceId', 'selectedBoardId'].includes(key),
})

export default store
