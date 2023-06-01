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
import { Group, GroupsVisualization, Mapping } from "@itwin/grouping-mapping-widget";
import { Text } from "@itwin/itwinui-react";
import React from "react";

export class GroupViewerProvider implements UiItemsProvider {
  public readonly id = "GroupViewerProvider";

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
        id: "Groups Viewer",
        label: this._props.mapping
          ? `Groups Viewer for ${this._props.mapping?.mappingName}`
          : "Groups Viewer",
        getWidgetContent: () => {
          return (
            <WidgetContent>
              {this._props.mapping ? (
                <GroupsVisualization
                  mapping={this._props.mapping}
                  onClickGroupTitle={this._props.onClickGroupTitle}
                  emphasizeElements={this._props.emphasizeElements}
                  isNonEmphasizedSelectable={this._props.isNonEmphasizedSelectable}
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
