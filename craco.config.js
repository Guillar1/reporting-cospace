/* eslint @typescript-eslint/no-var-requires: "off" */
/* craco.config.js */

const path = require("path");

module.exports = {
  reactScriptsVersion: "@bentley/react-scripts",
  webpack: {
    alias: {
      // For development through npm link to avoid multiple instances of react.
      react: path.join(__dirname, 'node_modules/react'),
      'react-dom': path.join(__dirname, 'node_modules/react-dom'),
      '@itwin/appui-abstract': path.join(__dirname, 'node_modules/@itwin/appui-abstract'),
      '@itwin/appui-layout-react': path.join(__dirname, 'node_modules/@itwin/appui-layout-react'),
      '@itwin/appui-react': path.join(__dirname, 'node_modules/@itwin/appui-react'),
      '@itwin/build-tools': path.join(__dirname, 'node_modules/@itwin/build-tools'),
      '@itwin/components-react': path.join(__dirname, 'node_modules/@itwin/components-react'),
      '@itwin/core-bentley': path.join(__dirname, 'node_modules/@itwin/core-bentley'),
      '@itwin/core-common': path.join(__dirname, 'node_modules/@itwin/core-common'),
      '@itwin/core-frontend': path.join(__dirname, 'node_modules/@itwin/core-frontend'),
      '@itwin/core-geometry': path.join(__dirname, 'node_modules/@itwin/core-geometry'),
      '@itwin/core-i18n': path.join(__dirname, 'node_modules/@itwin/core-i18n'),
      '@itwin/core-markup': path.join(__dirname, 'node_modules/@itwin/core-markup'),
      '@itwin/core-orbitgt': path.join(__dirname, 'node_modules/@itwin/core-orbitgt'),
      '@itwin/core-quantity': path.join(__dirname, 'node_modules/@itwin/core-quantity'),
      '@itwin/core-react': path.join(__dirname, 'node_modules/@itwin/core-react'),
      '@itwin/eslint-plugin': path.join(__dirname, 'node_modules/@itwin/eslint-plugin'),
      '@itwin/presentation-common': path.join(__dirname, 'node_modules/@itwin/presentation-common'),
      '@itwin/presentation-components': path.join(__dirname, 'node_modules/@itwin/presentation-components'),
      '@itwin/presentation-frontend': path.join(__dirname, 'node_modules/@itwin/presentation-frontend'),
      '@itwin/webgl-compatibility': path.join(__dirname, 'node_modules/@itwin/webgl-compatibility')
    }
  }
};
