import newrelic from 'newrelic'
import axios, { AxiosInstance } from 'axios'
import logger from '../../config/logger'
import { env } from '../../config'

const log = logger({ context: 'BrightData' })

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BrightDataProxyClient {
  private static readonly API_KEY = env.brightDataApiKey
  private static readonly API_PASSWORD = env.brightDataApiPassword

  static buildProxyAxiosInstance (): AxiosInstance {
    const axiosInstance = axios.create({
      proxy: {
        host: 'zproxy.lum-superproxy.io',
        port: 22225,
        auth: {
          username: BrightDataProxyClient.API_KEY,
          password: BrightDataProxyClient.API_PASSWORD
        },
        protocol: 'https'
      }
    })

    axiosInstance.interceptors.response.use(undefined, async error => {
      const brightDataError = error?.response?.headers['x-luminati-error']
      if (brightDataError) {
        newrelic.noticeError(error, {
          context: 'RioDeJaneiroApi',
          proxyError: `PROXY REQUEST FAILED WITH STATUS: ${brightDataError as string}`
        })

        log.error(`PROXY REQUEST FAILED WITH STATUS: ${brightDataError as string}`)
      }
      return await Promise.reject(error)
    })

    return axiosInstance

  }
}
