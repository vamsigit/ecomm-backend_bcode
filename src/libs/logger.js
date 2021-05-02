import winston from 'winston'
import morgan from 'morgan'

const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
  winston.format.colorize(),
  winston.format.simple(),
)

const logger = winston.createLogger({
  level: isProduction() ? 'info' :'',
  format: devFormat,
  transports: [
    new winston.transports.Console({}),
  ]
});

const morganStream = {
  write: (message) => logger.debug(message)
}
export const morganLogger = morgan(
  isProduction() ? 'combined' : 'dev',
  { stream: morganStream }
)

export default logger;
