# Auth Service — API Reference

Base URL: `${VITE_BACK_END_SERVER_URL}/api/auth`

All responses that complete authentication return a signed JWT in `{ token: string }`.
Errors are returned as `{ err: string }` — the service throws on receipt.

---

## `registerUser(signupFormData, photoData)`

Creates a new user account with email and password.

**Route:** `POST /api/auth/signup`

**Request body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "passwordConf": "string"
}
```

**Success response:**
```json
{ "token": "<jwt>" }
```

**Post-auth side effect:** If `photoData.photo` is a `File`, uploads the profile photo via `profileService.addPhoto()`.

---

## `createSession(loginFormData)`

Authenticates an existing user with email and password.

**Route:** `POST /api/auth/login`

**Request body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Success response:**
```json
{ "token": "<jwt>" }
```

---

## `authenticateWithGoogle(data)`

Authenticates (or registers) a user via Google OAuth. Used for both sign-in and sign-up flows.

**Route:** `POST /api/auth/google`

**Request body:**
```json
{
  "idToken": "string",
  "name": "string",
  "email": "string"
}
```

> `idToken` is the raw Google credential (JWT) returned by `@react-oauth/google`.
> `name` and `email` are decoded client-side from that token via `jwt_decode`.

**Success response:**
```json
{ "token": "<jwt>" }
```

---

## `authenticateWithFacebook(data)`

Authenticates (or registers) a user via Facebook Login. Used for both sign-in and sign-up flows.

**Route:** `POST /api/auth/facebook`

**Request body:**
```json
{
  "accessToken": "string"
}
```

> `accessToken` is the short-lived token provided by the Facebook JS SDK (`window.FB.login`) with scopes `email,public_profile`.

**Success response:**
```json
{ "token": "<jwt>" }
```

---

## `authenticateWithApple(data)`

Authenticates (or registers) a user via Sign in with Apple. Used for both sign-in and sign-up flows.

**Route:** `POST /api/auth/apple`

**Request body:**
```json
{
  "idToken": "string",
  "code": "string"
}
```

> `idToken` is `data.authorization.id_token` and `code` is `data.authorization.code`, both returned by `window.AppleID.auth.signIn()`.

**Success response:**
```json
{ "token": "<jwt>" }
```

---

## `updatePassword(changePasswordFormData)`

Updates the password for the currently authenticated user.

**Route:** `POST /api/auth/change-password`

**Headers:**
```
Authorization: Bearer <jwt>
Content-Type: application/json
```

**Request body:**
```json
{
  "curPassword": "string",
  "newPassword": "string",
  "newPasswordConf": "string"
}
```

**Success response:**
```json
{ "token": "<jwt>" }
```

> The old token is removed and the new token is stored on success.

---

## `getAuthenticatedUser()`

Returns the decoded user from the JWT stored in `localStorage`, or `null` if no valid token exists. This is a **local-only** call — no network request is made.

**Returns:** `User | null`

```ts
interface User {
  _id: string
  name: string
  email: string
  // ...additional profile fields
}
```

---

## `deleteSession()`

Removes the JWT from `localStorage`, effectively signing the user out. This is a **local-only** call — no network request is made.
