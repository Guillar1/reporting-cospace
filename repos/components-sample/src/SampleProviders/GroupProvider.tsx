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
import { Group, Groupings, Mapping } from "@itwin/grouping-mapping-widget";
import { Text } from "@itwin/itwinui-react";
import React from "react";

export class GroupProvider implements UiItemsProvider {
  public readonly id = "GroupProvider";

  constructor(
    private readonly _props: {
      mapping?: Mapping;
      emphasizeElements: boolean;
      isNonEmphasizedSelectable: boolean;
      onClickGroupTitle: (group: Group) => void;
      onClickGroupModify: (group: Group, queryGenerationType: string) => void;
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
        id: "groups",
        label: this._props.mapping
          ? `Groups for ${this._props.mapping?.mappingName}`
          : "Groups",
        getWidgetContent: () => {
          return (
            <WidgetContent>
              {this._props.mapping ? (
                <Groupings
                  mapping={this._props.mapping}
                  onClickGroupTitle={this._props.onClickGroupTitle}
                  emphasizeElements={this._props.emphasizeElements}
                  isNonEmphasizedSelectable = {this._props.isNonEmphasizedSelectable}
                  onClickGroupModify={this._props.onClickGroupModify}
                />
              ) : (
                <Text>Please select a workflow</Text>
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
