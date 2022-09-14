import { useActiveIModelConnection } from "@itwin/appui-react";
import { imageElementFromUrl } from "@itwin/core-frontend";
import { Button, ToggleSwitch } from "@itwin/itwinui-react";
import React, { useEffect } from "react";
import ClashReviewApi from "./ClashReviewApi";
import markerPinImage from "./marker-pin.svg";
import { MarkerData, MarkerPinDecorator } from "./MarkerPinDecorator";
import "./ClashDetectionUIProvider.scss";

const ClashDetectionUIProvider = () => {

    const iModelConnection = useActiveIModelConnection();
    const [applyZoom, setApplyZoom] = React.useState<boolean>(true);
    const [showDecorator, setShowDecorator] = React.useState<boolean>(true);
    const [clashData, setClashData] = React.useState<any>();
    const [markersData, setMarkersData] = React.useState<MarkerData[]>();
    const [image, setImage] = React.useState<HTMLImageElement>();

    const [clashPinDecorator] = React.useState<MarkerPinDecorator>(() => {
      return ClashReviewApi.setupDecorator();
    });

    useEffect(() => {
      imageElementFromUrl(markerPinImage)
        .then((img) => setImage(img))
        .catch((error) => console.error(error));
    }, []);

    /** Initialize Decorator */
    useEffect(() => {
      ClashReviewApi.enableDecorations(clashPinDecorator);
      return () => {
        ClashReviewApi.disableDecorations(clashPinDecorator);
      };
    }, [clashPinDecorator]);

    useEffect(() => {
      /** Create a listener that responds to clashData retrieval */
      const removeListener = ClashReviewApi.onClashDataChanged.addListener((data: any) => {
        setClashData(data);
      });

      if (iModelConnection) {
        /** Will start the clashData retrieval and receive the data through the listener */
        ClashReviewApi.setClashData(iModelConnection.iTwinId!)
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
      }
      return () => {
        removeListener();
      };
    }, [iModelConnection]);

    /** When the clashData comes in, get the marker data */
    useEffect(() => {
      if (iModelConnection && clashData) {
        ClashReviewApi.getClashMarkersData(iModelConnection, clashData).then((mData) => {
          setMarkersData(mData);
        })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
      }
    }, [iModelConnection, clashData]);

    useEffect(() => {
      if (markersData && image) {
        ClashReviewApi.setDecoratorPoints(markersData, clashPinDecorator, image);
        // Automatically visualize the first clash
        if (markersData !== undefined && markersData.length !== 0 && markersData[0].data !== undefined) {
          ClashReviewApi.visualizeClash(markersData[0].data.elementAId, markersData[0].data.elementBId);
        }
        setShowDecorator(true);
      }
    }, [markersData, image, clashPinDecorator]);

    useEffect(() => {
      if (showDecorator)
        ClashReviewApi.enableDecorations(clashPinDecorator);
      else
        ClashReviewApi.disableDecorations(clashPinDecorator);
    }, [showDecorator, clashPinDecorator]);

    useEffect(() => {
      if (applyZoom) {
        ClashReviewApi.enableZoom();
      } else {
        ClashReviewApi.disableZoom();
      }
    }, [applyZoom]);

    return (
      <>
        <div className="sample-options">
          <div className="iui-alert iui-informational instructions">
            <div className="iui-alert-message">
              Use the toggles to show clash marker pins or zoom to a clash. Click a marker or table entry to review clashes.
            </div>
          </div>
          <ToggleSwitch checked={showDecorator} onChange={() => setShowDecorator(!showDecorator)} label="Show Markers" labelPosition="right" className="sample-options-toggle" />
          <ToggleSwitch checked={applyZoom} onChange={() => setApplyZoom(!applyZoom)} label="Apply Zoom" labelPosition="right" className="sample-options-toggle" />
          <Button size="small" styleType="high-visibility" onClick={ClashReviewApi.resetDisplay} className="sample-options-button">Reset Display</Button>
        </div>
      </>
    );
};

export default ClashDetectionUIProvider;
