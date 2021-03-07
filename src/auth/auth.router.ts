import { Router } from 'express'

import AuthController from './auth.controller'
import AuthorizationGuard from '@middlewares/authorization.guard'

const router = Router()

router.get('/', AuthController.index)
router.get('/test', AuthorizationGuard, AuthController.test)
router.get('/logout', AuthorizationGuard, AuthController.logout)

export default router
