# CoSpace

Setup a `CoSpace` to link multiple (mono)repos together!

## Powered by

- [vscode multi-root workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [lage](https://microsoft.github.io/lage/)

## Getting started

1. **Install Node.js (Version 16.x)**

   - You can download Node.js from the official [Node.js website](https://nodejs.org/en/download/).

2. **Visual Studio Code**

   1. Open Visual Studio Code.
   2. `File` -> `Open Workspace From File`
   3. Select `reporting` workspace file in the root folder.

3. **Clone the `viewer-components-react` repository into the `repos` folder.**
   1. Navigate to the `repos` directory: `cd ./repos/`
   2. Clone the repository: `git clone https://github.com/iTwin/viewer-components-react.git`
   3. Upon completion, you should find a new `viewer-components-react` directory inside the `repos` folder. For instance: `./repos/viewer-components-react`
4. **Install `pnpm` and the necessary packages.**
   1. Install `pnpm` globally: `npm install -g pnpm`
   2. Navigate back to the root directory if not already present: `cd ..`
   3. Install the packages: `pnpm i`
5. **Build the `grouping-mapping-widget` package.**
   1. From anywhere within the root directory, build the package: `pnpm build`
6. **Update the environment variables in the `viewer` application.**
   1. Open the `.env` file in `repos/viewer/`.
   2. Update any necessary or missing variables.
7. **Start the `viewer` application.**
   1. Navigate to the viewer directory: `cd ./repos/viewer`
   2. Start the application: `npm start`
8. **Development Flow:**
   1. Make desired changes to the widget.
   2. Execute `pnpm run build` from any location or `npm run build` from within the widget root directory.
   3. While the `viewer` application is running, you should be able to observe the changes.
