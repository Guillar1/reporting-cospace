/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

// Clash Detection Result Sample Data

export const jsonData = {
    result: [
    {
      clashType: "Collision",
      clearance: -1,
      elementAId: "0x200000043f8",
      elementALabel: "Massing_Roof",
      elementACategoryIndex: 1,
      elementAModelIndex: 0,
      elementBId: "0x200000043f8",
      elementBLabel: "Massing_Roof",
      elementBCategoryIndex: 1,
      elementBModelIndex: 0,
      center: {
        x: 20.851473120590953,
        y: 24.670182380232927,
        z: 0.1524000000000001,
      },
    },
    {
      clashType: "Collision",
      clearance: -1,
      elementAId: "0x200000043f8",
      elementALabel: "210 King - roof deck - benches",
      elementACategoryIndex: 1,
      elementAModelIndex: 0,
      elementBId: "0x200000043f8",
      elementBLabel: "210 King - roof deck - benches",
      elementBCategoryIndex: 1,
      elementBModelIndex: 0,
      center: {
        x: 2.2860000000000085,
        y: 1.5240000000000005,
        z: 0.8381999999999932,
      },
    },
    {
      clashType: "Collision",
      clearance: -1,
      elementAId: "0x200000043f8",
      elementALabel: "Chair-Stacking",
      elementACategoryIndex: 1,
      elementAModelIndex: 0,
      elementBId: "0x200000043f8",
      elementBLabel: "Chair-Stacking",
      elementBCategoryIndex: 1,
      elementBModelIndex: 0,
      center: {
        x: -0.41542886147872454,
        y: -0.1410911331173194,
        z: 0.00012283869744472709,
      },
    },
  ],
    modelList: [{
      id: "0x20000000002",
      displayName: "BayTown",
    }],
    categoryList: [{
      id: "0x4000000000d",
      displayName: "Tag-Category",
    }, {
      id: "0x40000000e71",
      displayName: "Structure",
    }, {
      id: "0x40000000eba",
      displayName: "E-HEX",
    }, {
      id: "0x40000000edd",
      displayName: "PipeSupport",
    }],
  };
