import { ScreenViewport, IModelApp, FitViewTool, StandardViewId } from "@itwin/core-frontend";
import { GroupingMappingProvider } from "@itwin/grouping-mapping-widget";
import { ThemeType } from "@itwin/itwinui-react";
import { ReportsConfigWidget, ReportsConfigProvider, REPORTS_CONFIG_BASE_URL } from "@itwin/reports-config-widget-react";
import { Viewer, ViewerAuthorizationClient } from "@itwin/web-viewer-react";
import React from "react";
import { useCallback, useMemo, useEffect } from "react";
import { prefixUrl } from "./App";

interface SampleViewerProps {
  iTwinId: string,
  iModelId: string,
  prefix: "" | "dev" | "qa" | undefined,
  authClient: ViewerAuthorizationClient
}

export const SampleViewer = ({ iTwinId, iModelId, authClient, prefix }: SampleViewerProps) => {
  /** NOTE: This function will execute the "Fit View" tool after the iModel is loaded into the Viewer.
   * This will provide an "optimal" view of the model. However, it will override any default views that are
   * stored in the iModel. Delete this function and the prop that it is passed to if you prefer
   * to honor default views when they are present instead (the Viewer will still apply a similar function to iModels that do not have a default view).
   */
  const viewConfiguration = useCallback((viewPort: ScreenViewport) => {
    // default execute the fitview tool and use the iso standard view after tile trees are loaded
    const tileTreesLoaded = () => {
      return new Promise((resolve, reject) => {
        const start = new Date();
        const intvl = setInterval(() => {
          if (viewPort.areAllTileTreesLoaded) {
            clearInterval(intvl);
            resolve(true);
          }
          const now = new Date();
          // after 20 seconds, stop waiting and fit the view
          if (now.getTime() - start.getTime() > 20000) {
            reject();
          }
        }, 100);
      });
    };

    tileTreesLoaded().finally(() => {
      void IModelApp.tools.run(FitViewTool.toolId, viewPort, true, false);
      viewPort.view.setStandardRotation(StandardViewId.Iso);
    });
  }, []);

  const viewCreatorOptions = useMemo(
    () => ({ viewportConfigurer: viewConfiguration }),
    [viewConfiguration]
  );

  const handleOnIModelAppInit = async () => {
    // await IModelApp.localization.changeLanguage("en-PSEUDO");
    // UiFramework.setUiVersion("1")
  };

  useEffect(() => {
    ReportsConfigWidget.initialize(IModelApp.localization);
  })
  const [theme, setTheme] = React.useState<ThemeType>(
    (localStorage.getItem('THEME') as ThemeType) ?? 'light'
  );

  return (
    <Viewer
      iTwinId={iTwinId}
      iModelId={iModelId}
      authClient={authClient}
      viewCreatorOptions={viewCreatorOptions}
      // onIModelAppInit={handleOnIModelAppInit}
      // additionalI18nNamespaces={["ReportsConfigWidget"]}
      enablePerformanceMonitors={true} // see description in the README (https://www.npmjs.com/package/@itwin/desktop-viewer-react)
      theme={theme}
      uiProviders={[new GroupingMappingProvider({ prefix: prefix }), new ReportsConfigProvider(undefined, prefixUrl(REPORTS_CONFIG_BASE_URL, process.env.IMJS_URL_PREFIX))]} />
  )

  // new ReportsConfigProvider(undefined, prefixUrl(REPORTS_CONFIG_BASE_URL, process.env.IMJS_URL_PREFIX))
  // new GroupingMappingProvider(undefined, `${process.env.IMJS_URL_PREFIX}`.slice(0,-1) as any)
}