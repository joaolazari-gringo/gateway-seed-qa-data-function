import { Request, RequestHandler, Response } from 'express'

import logger from '../../../config/logger'
import { GondorService } from '../services/service'

const log = logger({ context: 'GondorCitiesController' })
export const GetGondorCitiesController = (gondorService: GondorService): RequestHandler => {
  return async (req: Request, res: Response) => {
    const endpointStart = new Date()
    const { foo, bar } = req.body

    try {
      const gondorCities = await gondorService.getGondorCities({ foo, bar })
      return res.status(200).json({ result: gondorCities })
    } catch (e: any) {

      log.error(`ERROR IN GONDOR CITIES SCRAPER ${e?.message}`)
      throw e
    } finally {

      const endpointEnd = new Date().getTime() - endpointStart.getTime()
      log.info(`ENDPOINT: ${endpointEnd} ms`)
    }
  }
}
