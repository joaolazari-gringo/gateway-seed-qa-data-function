import newrelic from 'newrelic'
import * as https from 'https'
import axios, { AxiosInstance } from 'axios'

import { env } from '../../config'
import logger from '../../config/logger'

const log = logger({ context: 'Zyte' })

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ZyteProxyClient {

  static buildProxyAxiosInstance (): AxiosInstance {
    const httpsAgent = new https.Agent({
      ca: env.zyteProxyCertificate,
      rejectUnauthorized: true,
      requestCert: true
    })

    const axiosInstance = axios.create({
      proxy: {
        host: 'gringo.crawlera.com',
        protocol: 'http',
        port: 8011,
        auth: {
          username: env.zyteApiKey,
          password: ''
        }
      },
      httpsAgent
    })

    axiosInstance.interceptors.response.use(undefined, async error => {
      const crawleraHeader = error?.response?.headers['x-crawlera-error']
      if (crawleraHeader) {
        newrelic.noticeError(error, {
          context: 'RioDeJaneiroApi',
          proxyError: `PROXY REQUEST FAILED WITH STATUS: ${crawleraHeader as string}`
        })

        log.error(`PROXY REQUEST FAILED WITH STATUS: ${crawleraHeader as string}`)
      }
      return await Promise.reject(error)
    })

    return axiosInstance

  }
}
