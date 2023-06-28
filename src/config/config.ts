import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const vars = process.env

export const env = {
  port: vars.PORT ?? 3000,
  zyteProxyCertificate: vars.ZYTE_PROXY_CERTIFICATE,
  zyteApiKey: vars.ZYTE_API_KEY ?? '',
  brightDataApiKey: vars.BRIGHT_DATA_API_KEY ?? 'brd-customer-hl_e214e2a3-zone-residential-country-br',
  brightDataApiPassword: vars.BRIGHT_DATA_API_PASSWORD ?? '2oj7s78yag97',
  scapingFunctionsApiKey: vars.SCRAPING_FUNCTIONS_API_KEY ?? '6c2bf5f6-545a-46c2-a8f3-4c5052d3a345',
  captchaServiceV2Url: vars.CAPTCHA_SERVICE_V2_URL ?? 'https://staging.gringo.com.vc/captcha-service-v2'
}
