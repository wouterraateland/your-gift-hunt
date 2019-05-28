import React, { memo, useEffect } from "react"
import { navigate } from "@reach/router"

import { SaveStateProvider } from "contexts/SaveState"
import { TemplateOptionsProvider } from "contexts/TemplateOptions"
import { TemplateSetProvider } from "contexts/TemplateSet"
import { TemplatesProvider } from "contexts/Templates"
import { TemplateInspectorProvider } from "contexts/TemplateInspector"
import { TemplateSetMutationsProvider } from "contexts/TemplateSetMutations"

import useTemplateSet from "hooks/useTemplateSet"

import Layout from "layouts/TemplateSetCreator"

import SettingsModal from "components/modals/TemplateSetSettings"
import DetailPane from "components/TemplateSetCreator/DetailPane"
import OverviewPane from "components/TemplateSetCreator/OverviewPane"

const TemplateSetCreator = memo(() => (
  <Layout>
    <OverviewPane />
    <DetailPane />
  </Layout>
))

const TemplateSetCreatorWithModal = props => {
  const { templateSetExists } = useTemplateSet()

  useEffect(
    () => {
      if (!templateSetExists) {
        navigate("/")
      }
    },
    [templateSetExists]
  )

  return templateSetExists ? (
    <>
      <TemplateSetCreator />
      {props["*"] === "settings" && <SettingsModal />}
    </>
  ) : null
}

const TemplateSetCreatorPage = ({ templateSetId, ...otherProps }) => (
  <SaveStateProvider>
    <TemplateOptionsProvider>
      <TemplateSetProvider templateSetId={templateSetId}>
        <TemplatesProvider>
          <TemplateInspectorProvider>
            <TemplateSetMutationsProvider>
              <TemplateSetCreatorWithModal {...otherProps} />
            </TemplateSetMutationsProvider>
          </TemplateInspectorProvider>
        </TemplatesProvider>
      </TemplateSetProvider>
    </TemplateOptionsProvider>
  </SaveStateProvider>
)

export default TemplateSetCreatorPage
