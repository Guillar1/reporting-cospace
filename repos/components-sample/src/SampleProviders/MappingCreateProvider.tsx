/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type {
  AbstractWidgetProps,
  UiItemsProvider,
} from "@itwin/appui-abstract";
import {
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
} from "@itwin/appui-abstract";
import { WidgetContent } from "../WidgetContent";
import { MappingAction, MappingActionProps } from "@itwin/grouping-mapping-widget"
import React from "react";

export class MappingCreateProvider implements UiItemsProvider {
  public readonly id = "MappingCreateProvider";

  constructor(private readonly _props: MappingActionProps) { }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection,
  ): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (
      (location === StagePanelLocation.Left &&
        section === StagePanelSection.End &&
        stageUsage === StageUsage.General)
    ) {
      const MappingCreateWidget: AbstractWidgetProps = {
        id: "createMapping",
        label: "Create Mapping",
        getWidgetContent: () => {
          return <WidgetContent><MappingAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(MappingCreateWidget);
    }

    return widgets;
  }
}
