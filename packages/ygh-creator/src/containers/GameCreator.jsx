import React from "react"
import { PanZoomEditorProvider } from "contexts/PanZoomEditor"
import { PanZoomGraphicProvider } from "contexts/PanZoomGraphic"
import { SaveStateProvider } from "contexts/SaveState"
import { GameTemplatesProvider } from "contexts/GameTemplates"
import { GameProvider } from "contexts/Game"
import { EntitiesProvider } from "contexts/Entities"
import { EntityFocusProvider } from "contexts/EntityFocus"
import { EntityGraphProvider } from "contexts/EntityGraph"
import { EntityAreasProvider } from "contexts/EntityAreas"
import { EntityPositionsProvider } from "contexts/EntityPositions"
import { EntityDependenciesProvider } from "contexts/EntityDependencies"
import { GameQueriesProvider } from "contexts/GameQueries"
import { GameMutationsProvider } from "contexts/GameMutations"
import { EditorProvider } from "contexts/Editor"
import { InspectorProvider } from "contexts/Inspector"

import useEntityPositionUpdates from "hooks/useEntityPositionUpdates"
import useEntityAreaUpdates from "hooks/useEntityAreaUpdates"

const Updater = ({ children }) => {
  useEntityPositionUpdates()
  useEntityAreaUpdates()

  return children
}

const GameCreatorContainer = ({ creatorSlug, gameSlug, children }) => (
  <PanZoomEditorProvider>
    <PanZoomGraphicProvider>
      <SaveStateProvider>
        <EntityFocusProvider>
          <GameProvider creatorSlug={creatorSlug} gameSlug={gameSlug}>
            <GameTemplatesProvider>
              <EntitiesProvider>
                <EntityGraphProvider>
                  <EntityAreasProvider>
                    <EntityPositionsProvider>
                      <EntityDependenciesProvider>
                        <GameQueriesProvider>
                          <GameMutationsProvider>
                            <EditorProvider>
                              <InspectorProvider>
                                <Updater>{children}</Updater>
                              </InspectorProvider>
                            </EditorProvider>
                          </GameMutationsProvider>
                        </GameQueriesProvider>
                      </EntityDependenciesProvider>
                    </EntityPositionsProvider>
                  </EntityAreasProvider>
                </EntityGraphProvider>
              </EntitiesProvider>
            </GameTemplatesProvider>
          </GameProvider>
        </EntityFocusProvider>
      </SaveStateProvider>
    </PanZoomGraphicProvider>
  </PanZoomEditorProvider>
)

export default GameCreatorContainer
