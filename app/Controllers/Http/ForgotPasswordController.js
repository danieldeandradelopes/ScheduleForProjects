'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')
const crypto = require('crypto')
const moment = require('moment')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      // aqui buscamos diretamente o campo email, portanto podemos utilizar o .input('email)
      const email = request.input('email')

      // findByOrFail => findBy encontra um único registro, caso não encontre o OrFail retorna um erro
      const user = await User.findByOrFail('email', email)

      // vamos criar um token para esse usuário
      // vamos utilizar o crypto para gerar uma chave
      // 10 => tamanho
      // string => texto
      // 'hex' => hexadecimal
      user.token = crypto.randomBytes(10).toString('hex')

      // anotamos o token_created_at com a data atual
      user.token_created_at = new Date()

      // salvamos o usuário
      await user.save()

      // enviar email de recuperação de senha
      await Mail.send(
        // 1º qual template vamos usar
        ['emails.forgot_password'],
        // 2º quais parametros vamos usar para esse template
        // ex.: nome do usuário
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        // a mensagem que iremos enviar
        message => {
          message
            .to(user.email)
            .from('danieldeandradelopes@gmail.com', 'Daniel | JACODE')
            .subject('Recuperação de senha!')
        }
      )
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      // recupero os parametros da nossa url
      const { token, password } = request.all()

      // faço uma pesquisa pra ver se existe esse token na tab de usuários
      const user = await User.findByOrFail('token', token)

      // utilizar o moment para verificar se o token foi criado da mais de 2 dias, caso seja
      // esse token é um token expirado
      // moment() => cria-se um objeto moment com a data atual
      // subtract('2', 'days') => tira dois dias da data atual
      // isAfter(user.token_created_at) => verifica se a data continua sendo maior que o user.token_created_at (data que o token foi gerado)
      // tokenExpired retorna true or false

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação expirou!' } })
      }

      // passamos o campo token da tab como null
      user.token = null
      // passamos o campo token_created_at da tab como null
      user.token_created_at = null
      // informamos um novo password para o campo password
      user.password = password

      // salvamos o update
      await user.save()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha!' } })
    }
  }
}

module.exports = ForgotPasswordController
