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
import { CustomCalculationAction, CustomCalculationActionProps } from "@itwin/grouping-mapping-widget"

export class CustomCalculationCreateProvider implements UiItemsProvider {
  public readonly id = "CustomCalculationCreateProvider";

  constructor(private readonly _props: CustomCalculationActionProps) { }

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
      const CustomCalculationCreateWidget: AbstractWidgetProps = {
        id: "createGroupCustomCalculation",
        label: "Create Custom Property",
        getWidgetContent: () => {
          return <WidgetContent><CustomCalculationAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(CustomCalculationCreateWidget);
    }

    return widgets;
  }
}
