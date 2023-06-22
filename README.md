# CoSpace

Setup a `CoSpace` to link multiple (mono)repos together!

## Powered by

- [vscode multi-root workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [lage](https://microsoft.github.io/lage/)

## Getting started

1. **Clone the `viewer-components-react` repository into the `repos` folder.**
   1. Navigate to the `repos` directory: `cd ./repos/`
   2. Clone the repository: `git clone https://github.com/iTwin/viewer-components-react.git`
   3. Upon completion, you should find a new `viewer-components-react` directory inside the `repos` folder. For instance: `./repos/viewer-components-react`
2. **Install `pnpm` and the necessary packages.**
   1. Install `pnpm` globally: `npm install -g pnpm`
   2. Navigate back to the root directory if not already present: `cd ..`
   3. Install the packages: `pnpm i`
3. **Build the `grouping-mapping-widget` package.**
   1. From anywhere within the root directory, build the package: `pnpm build`
4. **Update the environment variables in the `viewer` application.**
   1. Open the `.env` file in `repos/viewer/`.
   2. Update any necessary or missing variables.
5. **Start the `viewer` application.**
   1. Navigate to the viewer directory: `cd ./repos/viewer`
   2. Start the application: `npm start`
6. **Development Flow:**
   1. Make desired changes to the widget.
   2. Execute `pnpm run build` from any location or `npm run build` from within the widget root directory.
   3. While the `viewer` application is running, you should be able to observe the changes.
