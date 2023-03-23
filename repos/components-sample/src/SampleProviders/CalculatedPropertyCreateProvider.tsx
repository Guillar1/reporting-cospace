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
import { CalculatedPropertyAction, CalculatedPropertyActionProps } from "@itwin/grouping-mapping-widget"

export class CalculatedPropertyCreateProvider implements UiItemsProvider {
  public readonly id = "CalculatedPropertyCreateProvider";

  constructor(private readonly _props: CalculatedPropertyActionProps) { }

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
      const CalculatedPropertyCreateWidget: AbstractWidgetProps = {
        id: "createGroupCalculatedProperty",
        label: "Create Calculated Property",
        getWidgetContent: () => {
          return <WidgetContent><CalculatedPropertyAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(CalculatedPropertyCreateWidget);
    }

    return widgets;
  }
}
