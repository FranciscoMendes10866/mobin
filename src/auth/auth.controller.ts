import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

const { JWT_SECRET_KEY } = process.env

class AuthController {
  index (req: Request, res: Response) {
    const token = sign({ id: 'f66b94f2-7316-477a-a808-eb8f3287176a' }, JWT_SECRET_KEY)
    req.session.access_token = token
    return res
      .json({ message: 'A new session has been created. ✨' })
      .status(201)
  }

  test (req: Request, res: Response) {
    return res.json({ user: { id: req.tokenId } }).status(200)
  }

  logout (req: Request, res: Response) {
    req.session.destroy(err => {
      if (err) {
        throw new Error(err)
      }
    })
    return res.clearCookie('node_session').sendStatus(200)
  }
}

export default new AuthController()
