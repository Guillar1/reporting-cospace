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
import {
  CalculatedProperty,
  CustomCalculation,
  Group,
  Groupings,
  GroupProperty,
  Mapping,
  PropertyMenu,
} from "@itwin/grouping-mapping-widget";
import { Text } from "@itwin/itwinui-react";

export class PropertyMenuProvider implements UiItemsProvider {
  public readonly id = "PropertyProvider";

  constructor(
    private readonly _props: {
      mapping?: Mapping;
      group?: Group;
      onClickAddGroupProperty?: () => void;
      onClickModifyGroupProperty?: (groupProperty: GroupProperty) => void;
      onClickAddCalculatedProperty?: () => void;
      onClickModifyCalculatedProperty?: (calculatedProperty: CalculatedProperty) => void;
      onClickAddCustomCalculationProperty?: () => void;
      onClickModifyCustomCalculation?: (customCalculation: CustomCalculation) => void;
    }
  ) { }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (
      location === StagePanelLocation.Right &&
      section === StagePanelSection.Start &&
      stageUsage === StageUsage.General
    ) {
      const GroupWidget: AbstractWidgetProps = {
        id: "properties",
        label: this._props.group
          ? `Properties for ${this._props.group?.groupName}`
          : "Properties",
        getWidgetContent: () => {
          return (
            <WidgetContent>
              {this._props.mapping && this._props.group ? (
                <PropertyMenu
                  mapping={this._props.mapping}
                  group={this._props.group}
                  color="red"
                  onClickModifyGroupProperty={this._props.onClickModifyGroupProperty}
                  onClickModifyCalculatedProperty={this._props.onClickModifyCalculatedProperty}
                  onClickModifyCustomCalculation={this._props.onClickModifyCustomCalculation}
                />
              ) : (
                <Text>Please select a workflow and group</Text>
              )}
            </WidgetContent>
          );
        },
      };

      widgets.push(GroupWidget);
    }

    return widgets;
  }
}
