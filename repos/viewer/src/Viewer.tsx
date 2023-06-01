import { UiItemsProvider } from "@itwin/appui-abstract";
import {
  ScreenViewport,
  IModelApp,
  FitViewTool,
  StandardViewId,
} from "@itwin/core-frontend";
import {
  GroupingMappingCustomUI,
  GroupingMappingCustomUIType,
  GroupingMappingProvider,
  ManualGroupingCustomUI,
  SearchGroupingCustomUI,
} from "@itwin/grouping-mapping-widget";
import { Text } from "@itwin/itwinui-react";
// import { OneClickLCAProvider } from "@itwin/one-click-lca-react";
import {
  ReportsConfigWidget,
  ReportsConfigProvider,
  REPORTS_CONFIG_BASE_URL,
} from "@itwin/reports-config-widget-react";
// import { EC3Provider } from "@itwin/ec3-widget-react";
import { Viewer, ViewerAuthorizationClient } from "@itwin/web-viewer-react";
import React, { useState } from "react";
import { useCallback, useMemo, useEffect } from "react";
import { prefixUrl } from "./App";
import { EC3Provider } from "@itwin/ec3-widget-react";
import { SvgDraw, SvgSearch } from "@itwin/itwinui-icons-react";
import {
  PropertyGridManager,
  PropertyGridUiItemsProvider,
} from "@itwin/property-grid-react";

interface SampleViewerProps {
  iTwinId: string;
  iModelId: string;
  prefix: "" | "dev" | "qa" | undefined;
  authClient: ViewerAuthorizationClient;
}

const mapping = {
  id: "1a61a22f-e2db-4889-bf4f-2d5959310c1a",
  mappingName: "TestExtaraction",
  description: "",
  extractionEnabled: false,
  createdOn: "2022-05-31T05:56:38+00:00",
  createdBy: "Vikte.Baranauskiene@bentley.com",
  modifiedOn: "2022-06-13T04:59:48+00:00",
  modifiedBy: "Vikte.Baranauskiene@bentley.com",
  _links: {
    imodel: {
      href: "https://qa-api.bentley.com/imodels/6da93183-df5b-41e5-822d-69c94a437bfb",
    },
  },
};

const defaultGroupingUI: GroupingMappingCustomUI[] = [
  {
    name: "Search",
    displayLabel: "Search",
    type: GroupingMappingCustomUIType.Grouping,
    icon: <SvgSearch />,
    uiComponent: SearchGroupingCustomUI,
  },
  {
    name: "Manual",
    displayLabel: "Manual",
    type: GroupingMappingCustomUIType.Grouping,
    icon: <SvgDraw />,
    uiComponent: ManualGroupingCustomUI,
  },
  {
    name: "Test",
    displayLabel: "Test",
    type: GroupingMappingCustomUIType.Context,
    icon: <SvgDraw />,
    uiComponent: () => <Text>test</Text>,
  },
];

export const SampleViewer = ({
  iTwinId,
  iModelId,
  authClient,
  prefix,
}: SampleViewerProps) => {
  /** NOTE: This function will execute the "Fit View" tool after the iModel is loaded into the Viewer.
   * This will provide an "optimal" view of the model. However, it will override any default views that are
   * stored in the iModel. Delete this function and the prop that it is passed to if you prefer
   * to honor default views when they are present instead (the Viewer will still apply a similar function to iModels that do not have a default view).
   */

  const [accessToken, setAccessToken] = useState<string>("");
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

  const onIModelAppInit = useCallback(async () => {
    await PropertyGridManager.initialize();
    await ReportsConfigWidget.initialize();
  }, []);

  const uiProviders = useMemo(() => {
    const uiProviders: UiItemsProvider[] = [
      new GroupingMappingProvider({ prefix: prefix }),
      new ReportsConfigProvider(
        undefined,
        prefixUrl(REPORTS_CONFIG_BASE_URL, process.env.IMJS_URL_PREFIX)
      ),
      new PropertyGridUiItemsProvider({
        enableCopyingPropertyText: true,
      }),
      // new EC3Provider({
      //   clientId: "4YuNFhA8NpcIEDXfxFi81jEebwPj1wESqmZOx8NW",
      //   redirectUri: "http://localhost:8887/callback",
      // }),
    ];
    // if (!prefix) uiProviders.push(new OneClickLCAProvider());
    return uiProviders;
  }, [prefix]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await authClient.getAccessToken();
      setAccessToken(accessToken);
    };
    void fetchAccessToken();
  });

  return (
    <Viewer
      iTwinId={iTwinId}
      iModelId={iModelId}
      authClient={authClient}
      viewCreatorOptions={viewCreatorOptions}
      onIModelAppInit={onIModelAppInit}
      // additionalI18nNamespaces={["ReportsConfigWidget"]}
      enablePerformanceMonitors={true} // see description in the README (https://www.npmjs.com/package/@itwin/desktop-viewer-react)
      uiProviders={uiProviders}
    />
    // new EC3Provider({ clientId: '4YuNFhA8NpcIEDXfxFi81jEebwPj1wESqmZOx8NW', redirectUri: 'http://localhost:3000/callback' })
    // accessToken && (
    //   <GroupingMappingContext
    //     iModelId={iModelId}
    //     prefix="qa"
    //     getAccessToken={async () => accessToken}
    //   >
    //     <Groupings
    //       onClickAddGroup={() => { }}
    //       onClickGroupModify={() => { }}
    //       onClickGroupTitle={() => { }}
    //       onClickRenderContextCustomUI={() => { }}
    //       mapping={mapping}
    //     />
    //   </GroupingMappingContext>
    // )
  );

  // new ReportsConfigProvider(undefined, prefixUrl(REPORTS_CONFIG_BASE_URL, process.env.IMJS_URL_PREFIX))
  // new GroupingMappingProvider(undefined, `${process.env.IMJS_URL_PREFIX}`.slice(0,-1) as any)
};
