# Getting Started with the iTwin Viewer Create React App Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Grouping & Mapping Widget Development

1. Please follow the [Build Instructions](https://github.com/iTwin/viewer-components-react/blob/master/CONTRIBUTING.md#build-instructions) for Viewer Components React.
2. Go into `packages\itwin\grouping-mapping-widget` folder in the Viewer Components React directory.
3. Run `npm link`
4. Going back to this app, run `npm install`
5. After completion, `npm link @itwin/grouping-mapping-widget`
6. Populate .env variables.
7. `npm start` will run the app.

## Environment Variables

Prior to running the app, you will need to add OIDC client configuration to the variables in the .env file with the required scopes:

```
# ---- Authorization Client Settings ----
IMJS_AUTH_CLIENT_CLIENT_ID=""
IMJS_AUTH_CLIENT_REDIRECT_URI = "http://localhost:3000/signin-callback"
IMJS_AUTH_CLIENT_LOGOUT_URI = ""
IMJS_AUTH_CLIENT_SCOPES ="imodels:read insights:modify insights:read imodelaccess:read projects:read"
```

DEV:

```
IMJS_AUTH_AUTHORITY="https://qa-ims.bentley.com"
IMJS_URL_PREFIX="dev-"
```

QA:

```
IMJS_AUTH_AUTHORITY="https://qa-ims.bentley.com"
IMJS_URL_PREFIX="qa-"
```

PROD:

```
IMJS_AUTH_AUTHORITY="https://ims.bentley.com"
IMJS_URL_PREFIX=""
```
