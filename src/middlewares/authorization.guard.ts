import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import TokenDTO from '@utils/token.dto'

const { JWT_SECRET_KEY } = process.env

const AuthorizationGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session.access_token
  if (!token) {
    return res.sendStatus(403)
  }
  try {
    const decoded = verify(token, JWT_SECRET_KEY)
    const { id } = decoded as TokenDTO
    req.tokenId = id
    return next()
  } catch {
    return res.sendStatus(403)
  }
}

export default AuthorizationGuard
