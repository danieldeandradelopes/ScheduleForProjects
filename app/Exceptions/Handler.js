'use strict'

const Sentry = require('@sentry/node')

const Config = use('Config')

const BaseExceptionHandler = use('BaseExceptionHandler')
// vem lá do nosso env, aqui sabemos se estamos em produção ou desenvolvimento
const Env = use('Env')
// formatador de erros
const Youch = use('youch')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  // aqui diz como retornaremos o erro para front
  async handle (error, { request, response }) {
    // verificamos se é um erro de validação
    if (error.name === 'ValidationException') {
      // retornamos as mensagens de erro no formato de json para o nosso front
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      // formatamos nosso erro
      const youch = new Youch(error, request.request)

      // transformamos nosso youch para retornar um formato JSON
      const errorJSON = await youch.toJSON()

      // retornamos o erro para o usuário
      return response.status(error.status).send(errorJSON)
    }

    // caso não entre em nenhum if, quer dizer que estamos em produção, portanto retornamos uma mensagem de erro simples..
    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  // aqui dizemos o que faremos com esse erro, armazenaremos? avisaremos um serviço?
  async report (error, { request }) {
    Sentry.init({
      dsn: Config.get('services.sentry.dsn')
    })

    Sentry.captureException(error)
  }
}

// Sentry.init({
//   dsn: 'https://a105a73531224f48a837e44cb69146ff@sentry.io/1467670',
//   maxBreadcrumbs: 50,
//   debug: true,
// })
module.exports = ExceptionHandler
