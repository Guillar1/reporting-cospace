/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import type {
  AbstractWidgetProps,
  UiItemsProvider,
} from "@itwin/appui-abstract";
import {
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
} from "@itwin/appui-abstract";
import { Mapping, Mappings, MappingsProps } from "@itwin/grouping-mapping-widget"
import { WidgetContent } from "../WidgetContent";


export class MappingProvider implements UiItemsProvider {
  public readonly id = "MappingProvider";

  constructor(private readonly _props: MappingsProps) { }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection,
  ): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (
      (location === StagePanelLocation.Left &&
        section === StagePanelSection.Start &&
        stageUsage === StageUsage.General)
    ) {
      const MappingWidget: AbstractWidgetProps = {
        id: "mappings",
        label: "Workflows",
        getWidgetContent: () => {
          return <WidgetContent><Mappings {...this._props} displayStrings={{ mappings: "Workflows" }} /></WidgetContent>
        },
      };

      widgets.push(MappingWidget);
    }

    return widgets;
  }
}
