import { load } from 'cheerio'
import { DateTime } from 'luxon'
import { AxiosInstance } from 'axios'

import logger from '../../../config/logger'
import { GondorCities } from '../model/gondor-cities'
import { randomUserAgent } from '../../../utils/httpUtils'
import { GetGondorCities } from '../services/service'
import { CaptchaServiceClient } from '../services/captcha-service'
import { NewRelicCustomEventGondorSteps, NewRelicService } from '../services/newrelic-service'
import { Cookie } from 'tough-cookie'

const log = logger({ context: 'HttpGetGondorCities' })

export class HttpGetGondorCities implements GetGondorCities {
  constructor (private readonly axiosInstance: AxiosInstance,
    private readonly newRelicService: NewRelicService,
    private readonly captchaService: CaptchaServiceClient) {}

  async get (params: GetGondorCities.Params): Promise<GondorCities[]> {
    const { foo, bar, captchaMode } = params
    log.info(`GetGondorCities init: ${foo} ${bar}`)

    const initialRequestTime = DateTime.now()

    const initialPageRequest = await this.axiosInstance.get('https://tolkiengateway.net/wiki/Gondor', {
      headers: {
        'User-Agent': randomUserAgent()
        // ...Qualquer outro header útil
      }
    })

    const initialRequestDuration = initialRequestTime.diff(DateTime.now()).as('milliseconds')
    this.newRelicService.recordNewrelicCustomEvent('MiddleEarthGondorCities', NewRelicCustomEventGondorSteps.INITIAL_PAGE, initialRequestDuration, captchaMode ?? 'ondemand')

    // Extração dos cookies para requests futuras, se necessário
    const cookies = (initialPageRequest.headers['set-cookie'] ?? [])
      .map((cookieStr: string) => Cookie.parse(cookieStr))
      .map((cookie: any) => cookie?.cookieString())
      .join('; ')
      .trim()

    log.info(`Cookies: ${cookies}`)

    const $ = load(initialPageRequest.data)

    const rawData = $('.mw-parser-output > ul:nth-child(85) > li')
      // Use o método get sem nenhum atributo para converter o dado de Cheerio<Element> para Element[] -> Semelhante à um Array.from()
      .get()
      .map((element) => {
        // Cheerio aceita elementos como inputs para uma query com contexto
        return $(element).first().text()
      })

    const gondorCities: GondorCities[] = rawData.map(data => {
      // O dado vem no formato: <Nome da cidade>, <descrição da cidade>
      const city = data.split(',')

      return {
        name: (city[0] ?? '').trim(),
        description: (city[1] ?? '').trim()
      }
    })

    return gondorCities
  }

}
