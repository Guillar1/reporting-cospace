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
import { GroupPropertyAction, GroupPropertyActionProps } from "@itwin/grouping-mapping-widget"

export class GroupPropertyCreateProvider implements UiItemsProvider {
  public readonly id = "GroupPropertyCreateProvider";

  constructor(private readonly _props: GroupPropertyActionProps) { }

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
      const GroupPropertyCreateWidget: AbstractWidgetProps = {
        id: "createGroupPropperty",
        label: "Create Group Property",
        getWidgetContent: () => {
          return <WidgetContent><GroupPropertyAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(GroupPropertyCreateWidget);
    }

    return widgets;
  }
}
