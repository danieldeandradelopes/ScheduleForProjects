'use strict'

class SessionController {
  // criar nova sessão (autenticar)

  async store ({ request, response, auth }) {
    // pegamos o email e password usando a desestruturação
    // ambos vem do nosso request
    const { email, password } = request.all()

    // gerar o token, utilizamos o método attempt
    // aí temos o retorno de um jwt (json web token)
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
