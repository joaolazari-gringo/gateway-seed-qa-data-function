import newrelic from 'newrelic'

export type MIDDLE_EARTH_GONDOR_CITIES = 'MiddleEarthGondorCities'
export type NewRelicGondorCustomEvents = MIDDLE_EARTH_GONDOR_CITIES

export enum NewRelicCustomEventGondorSteps {
  CAPTCHA = 'CAPTCHA',
  INITIAL_PAGE = 'INITIAL_PAGE'
}

export class NewRelicService {
  private static instance: NewRelicService | undefined

  private constructor () {}

  static getInstance = (): NewRelicService => {
    if (!this.instance) {
      this.instance = new NewRelicService()
    }
    return this.instance
  }

  public recordNewrelicCustomEvent = (table: NewRelicGondorCustomEvents, step: string, stepDuration: number, captchaMode: string): void => {
    newrelic.recordCustomEvent(table, {
      step,
      captcha_mode: captchaMode,
      step_duration: stepDuration
    })
  }

  public addCustomAttributes = (atts: Record<string, string | number | boolean>): void => {
    newrelic.addCustomAttributes(atts)
  }
}
