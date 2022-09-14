/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { BeEvent } from "@itwin/core-bentley";
import { ColorDef, FeatureOverrideType } from "@itwin/core-common";
import { EmphasizeElements, IModelApp, ViewChangeOptions } from "@itwin/core-frontend";
import ClashDetectionClient from "./ClashDetectionClient";
import { jsonData } from "./ClashDetectionJsonData";
import { MarkerData, MarkerPinDecorator } from "./MarkerPinDecorator";

export default class ClashReviewApi {

  public static onClashDataChanged = new BeEvent<any>();

  private static _clashData: { [id: string]: any } = {};
  private static _applyZoom: boolean = true;

  public static setupDecorator() {
    return new MarkerPinDecorator();
  }

  public static setDecoratorPoints(markersData: MarkerData[], decorator: MarkerPinDecorator, image: HTMLImageElement) {
    decorator.setMarkersData(markersData, image, ClashReviewApi.visualizeClashCallback);
  }

  public static enableDecorations(decorator: MarkerPinDecorator) {
    if (!IModelApp.viewManager.decorators.includes(decorator))
      IModelApp.viewManager.addDecorator(decorator);
  }

  public static disableDecorations(decorator: MarkerPinDecorator) {
    IModelApp.viewManager.dropDecorator(decorator);
  }

  public static enableZoom() {
    ClashReviewApi._applyZoom = true;
  }

  public static disableZoom() {
    ClashReviewApi._applyZoom = false;
  }

  public static async setClashData(projectId: string): Promise<void> {
    const clashData = await ClashReviewApi.getClashData(projectId);
    ClashReviewApi.onClashDataChanged.raiseEvent(clashData);
  }

  public static async getClashData(projectId: string): Promise<any> {

    if (ClashReviewApi._clashData[projectId] === undefined) {
      const runsResponse = await ClashDetectionClient.getClashTestRuns(projectId);
      if (runsResponse !== undefined && runsResponse.runs !== undefined && runsResponse.runs.length !== 0) {
        // Get validation result
        const resultResponse = await ClashDetectionClient.getValidationUrlResponse(runsResponse.runs[0]._links.result.href);
        if (resultResponse !== undefined && resultResponse.result !== undefined)
          ClashReviewApi._clashData[projectId] = resultResponse;
      }
      if (ClashReviewApi._clashData[projectId] === undefined) {
        ClashReviewApi._clashData[projectId] = jsonData;
      }
    }

    return ClashReviewApi._clashData[projectId];
  }

  public static async getClashMarkersData(iModelConnection: any, clashData: any): Promise<MarkerData[]> {
    const markersData: MarkerData[] = [];
    if (iModelConnection && clashData) {
      for (const result of clashData.result) {
        const title = "Collision(s) found:";
        const description = `Element A: ${result.elementALabel}<br>Element B: ${result.elementBLabel}`;
        const clashMarkerData: MarkerData = { point: result.center, data: result, title, description };
        markersData.push(clashMarkerData);
      }
    }
    return markersData;
  }

  public static visualizeClashCallback = (clashData: any) => {
    ClashReviewApi.visualizeClash(clashData.elementAId, clashData.elementBId);
  };

  public static visualizeClash(elementAId: string, elementBId: string) {
    if (!IModelApp.viewManager.selectedView)
      return;

    const vp = IModelApp.viewManager.selectedView;
    const provider = EmphasizeElements.getOrCreate(vp);
    provider.clearEmphasizedElements(vp);
    provider.clearOverriddenElements(vp);
    provider.overrideElements(elementAId, vp, ColorDef.red, FeatureOverrideType.ColorOnly, true);
    provider.overrideElements(elementBId, vp, ColorDef.blue, FeatureOverrideType.ColorOnly, false);
    provider.wantEmphasis = true;
    provider.emphasizeElements([elementAId, elementBId], vp, undefined, false);

    if (ClashReviewApi._applyZoom) {
      const viewChangeOpts: ViewChangeOptions = {};
      viewChangeOpts.animateFrustumChange = true;
      vp.zoomToElements([elementAId, elementBId], { ...viewChangeOpts })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  public static resetDisplay() {
    if (!IModelApp.viewManager.selectedView)
      return;

    const vp = IModelApp.viewManager.selectedView;
    const provider = EmphasizeElements.getOrCreate(vp);
    provider.clearEmphasizedElements(vp);
    provider.clearOverriddenElements(vp);
  }
}
