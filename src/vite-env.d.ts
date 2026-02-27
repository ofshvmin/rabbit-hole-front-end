/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_END_SERVER_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_FACEBOOK_APP_ID: string
  readonly VITE_APPLE_CLIENT_ID: string
  readonly VITE_APPLE_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Google Identity Services global
interface GoogleIdNotification {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
}

// Facebook SDK global
interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string
          callback: (response: { credential: string }) => void
          auto_select?: boolean
          cancel_on_tap_outside?: boolean
        }) => void
        prompt: (callback?: (notification: GoogleIdNotification) => void) => void
        renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
      }
    }
  }
  FB: {
    init: (params: {
      appId: string
      cookie: boolean
      xfbml: boolean
      version: string
    }) => void
    login: (
      callback: (response: {
        authResponse?: { accessToken: string; userID: string }
        status: string
      }) => void,
      options?: { scope: string }
    ) => void
  }
  fbAsyncInit?: () => void
  // Apple Sign In global
  AppleID: {
    auth: {
      init: (config: {
        clientId: string
        scope: string
        redirectURI: string
        usePopup: boolean
      }) => void
      signIn: () => Promise<{
        authorization: { code: string; id_token: string }
        user?: {
          name?: { firstName?: string; lastName?: string }
          email?: string
        }
      }>
    }
  }
}
