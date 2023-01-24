import {
  ScreenViewport,
  IModelApp,
  FitViewTool,
  StandardViewId,
} from "@itwin/core-frontend";
import {
  GroupingMappingContext, GroupingMappingCustomUI, GroupingMappingCustomUIType, GroupQueryBuilderCustomUI, ManualGroupingCustomUI, Mapping, SearchGroupingCustomUI
} from "@itwin/grouping-mapping-widget";
import {
  ItwinViewerUi,
  Viewer,
  ViewerAuthorizationClient,
} from "@itwin/web-viewer-react";
import {
  MeasureTools,
  MeasureToolsUiItemsProvider,
} from "@itwin/measure-tools-react";
import {
  PropertyGridManager,
  PropertyGridUiItemsProvider,
} from "@itwin/property-grid-react";
import {
  TreeWidget,
  TreeWidgetUiItemsProvider,
} from "@itwin/tree-widget-react";
import { useCallback, useMemo, useState } from "react";
import { GroupProvider } from "./SampleProviders/GroupProvider";
import { MappingProvider } from "./SampleProviders/MappingProvider";
import { GroupActionProvider } from "./SampleProviders/GroupActionProvider";
import { SvgCursor, SvgDraw, SvgSearch } from "@itwin/itwinui-icons-react";
import { toaster } from "@itwin/itwinui-react";
import { MappingCreateProvider } from "./SampleProviders/MappingCreateProvider";
import { MappingModifyProvider } from "./SampleProviders/MappingModifyProvider";

interface SampleViewerProps {
  iTwinId: string;
  iModelId: string;
  prefix: "" | "dev" | "qa" | undefined;
  authClient: ViewerAuthorizationClient;
}

export const Default3DNoSelection: ItwinViewerUi = {
  hideTreeView: true,
  hideToolSettings: true,
  hidePropertyGrid: true,
};

const defaultGroupingUI: GroupingMappingCustomUI[] = [
  {
    name: "Selection",
    displayLabel: "Selection",
    type: GroupingMappingCustomUIType.Grouping,
    icon: <SvgCursor />,
    uiComponent: GroupQueryBuilderCustomUI,
  },
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
];


export const SampleViewer = ({
  iTwinId,
  iModelId,
  authClient,
  prefix,
}: SampleViewerProps) => {
  const [mapping, setMapping] = useState<Mapping | undefined>()
  const [modifyingMapping, setModifyingMapping] = useState<Mapping | undefined>();


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

  const onIModelAppInit = useCallback(async () => {
    await TreeWidget.initialize();
    await PropertyGridManager.initialize();
    await MeasureTools.startup();
  }, []);

  const displaySaveSuccess = () => {
    toaster.setSettings({
      placement: 'top',
    });
    toaster.positive("Save successful!");
  };

  const uiProviders = useMemo(() => [
    // new TreeWidgetUiItemsProvider(),
    // new PropertyGridUiItemsProvider({
    //   enableCopyingPropertyText: true,
    // }),
    // new MeasureToolsUiItemsProvider(),
    new MappingProvider({ onClickMappingTitle: ((m) => setMapping(m)), onClickMappingModify: ((m) => setModifyingMapping(m)) }),
    new MappingCreateProvider({ onSaveSuccess: displaySaveSuccess, }),
    modifyingMapping ? new MappingModifyProvider({
      mapping: modifyingMapping, onSaveSuccess: () => {
        displaySaveSuccess();
        setModifyingMapping(undefined)
      },
      onClickCancel: () => { setModifyingMapping(undefined) }
    }) : [],
    new GroupProvider({ mapping: mapping, emphasizeElements: false }),
    mapping ? new GroupActionProvider({ mappingId: mapping.id, onSaveSuccess: displaySaveSuccess, queryGenerationType: "Selection" }) : []
  ].flatMap((x) => x), [mapping, modifyingMapping])


  return (
    <GroupingMappingContext
      customUIs={defaultGroupingUI}
      iModelId={iModelId ?? ""} prefix={prefix}>
      <Viewer
        iTwinId={iTwinId ?? ""}
        iModelId={iModelId ?? ""}
        authClient={authClient}
        viewCreatorOptions={viewCreatorOptions}
        enablePerformanceMonitors={true} // see description in the README (https://www.npmjs.com/package/@itwin/web-viewer-react)
        onIModelAppInit={onIModelAppInit}
        uiProviders={uiProviders}
        defaultUiConfig={Default3DNoSelection}
      />
    </GroupingMappingContext>
  );
};
