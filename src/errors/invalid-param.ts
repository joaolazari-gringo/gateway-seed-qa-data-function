// https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
export class InvalidParamError extends Error {
  target: any

  constructor (message: string, logger?: any) {
    super(message)
    this.name = 'InvalidParamError'
    this.target = logger?.defaultMeta?.target
    Object.setPrototypeOf(this, InvalidParamError.prototype)
  }
}
