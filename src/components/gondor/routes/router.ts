import axios from 'axios'
import { Router, json } from 'express'

import { GondorService } from '../services/service'
import { HttpGetGondorCities } from '../clients/http-get-gondor-cities'
import { GetGondorCitiesController } from '../controllers/get-gondor-cities-controller'
import { NewRelicService } from '../services/newrelic-service'
import CaptchaServiceClientImpl from '../services/captcha-service'

const router = Router()

// TODO add proxy
const httpGondorCities = new GondorService(
  new HttpGetGondorCities(axios.create(),
    NewRelicService.getInstance(),
    new CaptchaServiceClientImpl()))

router.post('/gondor/v1/cities', [json()], GetGondorCitiesController(httpGondorCities))

export const gondorRouter = router
