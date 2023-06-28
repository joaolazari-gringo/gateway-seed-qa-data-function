import logger from '../../../config/logger'
import { GondorCities } from '../model/gondor-cities'
import { fromModelToDTO, GondorCitiesDTO } from '../dto/gondor-cities'
import { InvalidParamError } from '../../../errors/invalid-param'
import { NewRelicService } from './newrelic-service'

export type GondorUseCasesOutputs = GondorCities[] | GondorCitiesDTO

abstract class GondorUseCases<T extends GondorUseCasesOutputs> {
  abstract get (params: GetGondorCities.Params): Promise<T>
}

export interface GetGondorCities extends GondorUseCases<GondorCities[]> {

  get: (params: GetGondorCities.Params) => Promise<GondorCities[]>
}

export namespace GetGondorCities {
  export interface Params {
    foo: string
    bar: string
    captchaMode?: string
  }
}

const log = logger({ context: 'GondorService' })

export class GondorService {
  private readonly newRelicService: NewRelicService
  constructor (private readonly client: GondorUseCases<GondorUseCasesOutputs>) {
    this.newRelicService = NewRelicService.getInstance()
  }

  async getGondorCities (params: GetGondorCities.Params): Promise<GondorCitiesDTO> {
    log.info(`Getting Gondor cities for [${params.foo}] [${params.bar}]`)

    if (!params.foo) {
      throw new InvalidParamError('foo can not be null or empty')
    }

    if (!params.bar) {
      throw new InvalidParamError('bar can not be null or empty')
    }

    const gondorCities = await this.client.get(params)
    return fromModelToDTO(gondorCities)
  }

}
