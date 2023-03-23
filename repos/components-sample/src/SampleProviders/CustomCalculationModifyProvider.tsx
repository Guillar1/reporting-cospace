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

export class CustomCalculationModifyProvider implements UiItemsProvider {
  public readonly id = "CustomCalculationModifyProvider";

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
      const CustomCalculationPropertyModifyWidget: AbstractWidgetProps = {
        id: "modifyGroupCustomCalculationProperty",
        label: "Modify Custom Calculation Property",
        getWidgetContent: () => {
          return <WidgetContent><CustomCalculationAction {...this._props} /></WidgetContent>;
        },
      };

      widgets.push(CustomCalculationPropertyModifyWidget);
    }

    return widgets;
  }
}
