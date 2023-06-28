import type { AxiosInstance } from 'axios'

import axios from 'axios'
import { DateTime } from 'luxon'

import logger from '../../../config/logger'
import { NewRelicGondorCustomEvents, NewRelicService } from './newrelic-service'

const captchaLogger = logger({ context: 'CaptchaService' })

type CaptchaResponse = { response: string } | { taskId: string }

interface GetCaptchaResponseOptions {
  timeout?: number
  type: 'ReCaptchaV2' | 'NoCaptchaTaskProxyless' | 'ImageCaptcha'
  mode?: 'buffered' | 'ondemand'
  args: {
    pageUrl?: string
    googleSiteKey?: string
    imageBase64?: string
  }
}

export interface CaptchaServiceClient {
  getCaptchaResponse: (options: GetCaptchaResponseOptions, source: NewRelicGondorCustomEvents) => Promise<string>
}

export default class CaptchaServiceClientImpl implements CaptchaServiceClient {
  private readonly axiosInstance: AxiosInstance

  constructor () {
    const apiKey = (process.env.SCRAPING_FUNCTIONS_API_KEY as string) || '6c2bf5f6-545a-46c2-a8f3-4c5052d3a345'
    const baseURL = (process.env.CAPTCHA_SERVICE_V2_URL as string) || 'https://staging.gringo.com.vc/captcha-service-v2'

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Api-Key ${apiKey}`
      }
    })
  }

  public async getCaptchaResponse ({ timeout = 90_000, ...options }: GetCaptchaResponseOptions, source: NewRelicGondorCustomEvents): Promise<string> {
    try {
      const captchaRequestTime = DateTime.now()
      const { data } = await this.axiosInstance.post<CaptchaResponse>('/v1/captcha', options, {
        timeout
      })

      const captchaDuration = DateTime.now().diff(captchaRequestTime, 'milliseconds').as('seconds')
      NewRelicService.getInstance().recordNewrelicCustomEvent(source, 'CAPTCHA', captchaDuration, options.mode ?? 'ondemand')

      captchaLogger.info(`Captcha response time: ${captchaDuration}s using mode ${options.mode}`)

      if ('taskId' in data) {
        return data.taskId
      }

      return data.response
    } catch (error: any) {
      captchaLogger.error(`Failed to solve captcha: ${error.message}`)
      throw error
    }
  }
}
