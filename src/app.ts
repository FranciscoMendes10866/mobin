import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import session from 'express-session'
import connectRedis from 'connect-redis'

import AuthRouter from '@auth/auth.router'
import RedisSessions from '@providers/redis.sessions'

const { NODE_ENV, CORS_ORIGIN, SESSIONS_SECRET_KEY } = process.env

const app = express()
const RedisStore = connectRedis(session)

if (NODE_ENV !== 'TEST') app.use(morgan('dev'))

app.use(express.json())
app.use(cors({ credentials: true, origin: CORS_ORIGIN }))
app.use(helmet())
app.use(session({
  store: new RedisStore({ client: RedisSessions }),
  name: 'node_session',
  secret: SESSIONS_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'PROD'
  }
}))
app.use(compression())
app.use('/api/auth', AuthRouter)

export default app
