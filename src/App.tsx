/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./App.scss";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import "@itwin/itwinui-layouts-css/dist/styles.css";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import type { ScreenViewport } from "@itwin/core-frontend";
import { FitViewTool, IModelApp, StandardViewId } from "@itwin/core-frontend";
import { useAccessToken, Viewer } from "@itwin/web-viewer-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SvgMoon, SvgSun } from "@itwin/itwinui-icons-react";
import { GroupingMappingProvider } from "@itwin/grouping-mapping-widget";
import {
  ReportsConfigProvider,
  ReportsConfigWidget,
  REPORTS_CONFIG_BASE_URL,
} from "@itwin/reports-config-widget-react";
import { Button, IconButton, ThemeType, useTheme } from "@itwin/itwinui-react";
import { useSearchParams } from "react-router-dom";
import SelectIModel from "./SelectIModel";
import SelectProject from "./SelectProject";
import { IModelFull, ProjectFull } from "@itwin/imodel-browser-react";
import { SampleViewer } from "./Viewer";
import { AccessToken } from "@itwin/core-bentley";
import AuthClient from "./AuthClient";

export const prefixUrl = (baseUrl?: string, prefix?: string) => {
  if (prefix && baseUrl) {
    return baseUrl.replace("api.bentley.com", `${prefix}api.bentley.com`);
  }
  return baseUrl;
};

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState<AccessToken>();
  const [iModelId, setIModelId] = useState<string>(
    searchParams.get("iModelId") ?? ""
  );
  const [iTwinId, setITwinId] = useState<string>(
    searchParams.get("iTwinId") ?? ""
  );

  useEffect(() => {
    const initAuth = async () => {
      if (!AuthClient.client) {
        const client = AuthClient.initialize();

        try {
          // attempt silent signin
          await AuthClient.signInSilent();
        } catch (error) {
          // if silent sign in fails, have user manually sign in
          await AuthClient.signIn();
        }

        setAccessToken(await client.getAccessToken());
      }
    };

    initAuth().catch(console.error);

    return () => {
      AuthClient.dispose();
    };
  }, []);

  const prefix = `${process.env.IMJS_URL_PREFIX}`.slice(0, -1) as any;

  const onIModelSelect = (iModel: IModelFull) => {
    setIModelId(iModel.id);
    searchParams.set("iModelId", iModel.id)
    setSearchParams(searchParams);
  };
  const onProjectSelect = (project: ProjectFull) => {
    setITwinId(project.id);
    setSearchParams({ iTwinId: project.id });
  };

  return (
    <PageLayout>
      <PageLayout.Content>
        {iTwinId && iModelId && AuthClient.client ? (
          <SampleViewer
            iTwinId={iTwinId}
            iModelId={iModelId}
            prefix={prefix}
            authClient={AuthClient.client}
          />
        ) : iTwinId ? (
          <SelectIModel
            projectId={iTwinId}
            prefix={prefix}
            accessToken={accessToken ?? ""}
            onSelect={onIModelSelect}
            backFn={() => { setSearchParams({}); setITwinId("") }}
          />
        ) : (
          <SelectProject
            prefix={prefix}
            accessToken={accessToken ?? ""}
            onSelect={onProjectSelect}
          />
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};

export default App;
