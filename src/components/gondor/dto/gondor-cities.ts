import { GondorCities } from '../model/gondor-cities'

export type GondorCitiesDTO = GondorCities[]

// Tratamento dos dados para consumo externo, mas sem regras de negócio
// Basicamente nesta etapa removemos espaços, quebras de linha ou caracteres inválidos

const invalidString = '(debatable)[27]'

export const fromModelToDTO = (rawData: GondorCities[]): GondorCitiesDTO => {
  return rawData.map(city => {

    const name = city.name.replace(invalidString, '').trim()
    const description = city.description.charAt(0).toUpperCase() + city.description.slice(1)

    return { name, description }
  })
}
