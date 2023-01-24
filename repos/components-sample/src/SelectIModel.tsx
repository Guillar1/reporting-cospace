/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type {
  ApiOverrides,
  IModelFull,
} from "@itwin/imodel-browser-react";
import {
  IModelGrid,
} from "@itwin/imodel-browser-react";
import { Button } from "@itwin/itwinui-react";
import { useEffect, useState } from "react";
import "./SelectIModel.scss";

interface SelectIModelProps {
  projectId: string;
  prefix: "" | "dev" | "qa" | undefined,
  accessToken: string,
  onSelect: (project: IModelFull) => void;
  backFn: () => void;
}
const SelectIModel = ({
  projectId,
  prefix,
  accessToken,
  onSelect,
  backFn,
}: SelectIModelProps) => {
  const [apiOverrides, setApiOverrides] = useState<ApiOverrides<IModelFull[]>>(
    () => ({ serverEnvironmentPrefix: prefix })
  );

  useEffect(() => setApiOverrides(() => ({ serverEnvironmentPrefix: prefix })), [prefix]);

  return (
    <div className='imodel-grid-container'>
      <div className='imodel-grid'>
        <IModelGrid
          projectId={projectId}
          onThumbnailClick={onSelect}
          accessToken={accessToken}
          apiOverrides={apiOverrides}
        />
      </div>
      <div className='import-action-panel'>
        <Button onClick={backFn}>Back</Button>
      </div>
    </div>
  );
};

export default SelectIModel;
