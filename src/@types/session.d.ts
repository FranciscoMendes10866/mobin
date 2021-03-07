/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    access_token: string
  }
}
