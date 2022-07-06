/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *
 * This code is for demonstration purposes and should not be considered production ready.
 *--------------------------------------------------------------------------------------------*/
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";

class AuthClient {
  private static _client?: BrowserAuthorizationClient;

  public static get client(): BrowserAuthorizationClient | undefined {
    return this._client;
  }

  public static initialize(
  ): BrowserAuthorizationClient {
    if (!this._client) {
      this._client = new BrowserAuthorizationClient({
        scope: process.env.IMJS_AUTH_CLIENT_SCOPES ?? '',
        clientId: process.env.IMJS_AUTH_CLIENT_CLIENT_ID ?? '',
        redirectUri: process.env.IMJS_AUTH_CLIENT_REDIRECT_URI ?? '',
        postSignoutRedirectUri: process.env.IMJS_AUTH_CLIENT_LOGOUT_URI,
        responseType: 'code',
        authority: process.env.IMJS_AUTH_AUTHORITY,
      });
    }
    return this._client;
  }

  public static async signIn(): Promise<void> {
    await this.client?.signIn();
  }

  public static async signInSilent(): Promise<void> {
    await this.client?.signInSilent();
  }

  public static async signOut(): Promise<void> {
    await this.client?.signOut();
  }

  public static dispose(): void {
    this._client = undefined;
  }
}

export default AuthClient;