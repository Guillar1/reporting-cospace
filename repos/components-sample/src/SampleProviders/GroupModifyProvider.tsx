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
import { GroupAction, GroupActionProps } from "@itwin/grouping-mapping-widget"
import React from "react";

export class GroupModifyProvider implements UiItemsProvider {
  public readonly id = "GroupModifyProvider";

  constructor(private readonly _props: GroupActionProps) { }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection,
  ): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (
      (location === StagePanelLocation.Right &&
        section === StagePanelSection.End &&
        stageUsage === StageUsage.General)
    ) {
      const GroupActionWidget: AbstractWidgetProps = {
        id: "modifyGroup",
        label: "Modify Group",
        getWidgetContent: () => {
          return <WidgetContent><GroupAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(GroupActionWidget);
    }

    return widgets;
  }
}
