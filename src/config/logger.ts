import { createLogger, format, Logger, transports } from 'winston'
import { TransformableInfo } from 'logform'

const { combine, printf, label, colorize } = format

const msgTemplate = printf((info: TransformableInfo) => {
  const d = new Date()
  return `=> ${d.toISOString()} [${info.level}] ${info.label as string}: ${info.message}`
})

interface LoggerConfig {
  context: string
}

const logger = (config: LoggerConfig): Logger => {
  return createLogger({
    level: 'info',
    format: combine(
      colorize(),
      label({ label: config.context }),
      msgTemplate
    ),
    transports: [new transports.Console()]
  })
}

export default logger
