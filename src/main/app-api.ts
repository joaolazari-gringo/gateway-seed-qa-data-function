import express, { Application } from 'express'
import 'express-async-errors'

import { gondorRouter } from '../components/gondor/routes/router'
import { mordorRouter } from '../components/mordor/routes/router'
import { globalErrorHandler } from '../infraestructure/global-error-handler'

const expressApp: Application = express()

expressApp.use(gondorRouter)
expressApp.use(mordorRouter)
expressApp.use(globalErrorHandler)

export const app = expressApp
