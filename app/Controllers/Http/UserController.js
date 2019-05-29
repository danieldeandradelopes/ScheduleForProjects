'use strict'
// database => para fazer os transactions (commit, rollback etc)
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  // ctx => contexto
  async store ({ request }) {
    // nos parametros dentro do only, dizemos exatamente os campos que o usuário deve preencher
    const data = request.only(['username', 'email', 'password'])

    // pegando o array de endereços do nosso body
    const addresses = request.input('addresses')

    // trx => (sigla para transação)
    // beginTransaction => começar transação
    const trx = await Database.beginTransaction()

    // criamos um novo usuário
    // passamos o trx como segundo parametro para "monitorar" aquela ação
    const user = await User.create(data, trx)

    // depois de criar o usuário, inserimos para o mesmo um endereço
    // se tiver 10, ele cria 10 visto que o relacionamento permite
    // passamos o trx como segundo parametro para "monitorar" aquela ação
    await user.addresses().createMany(addresses, trx)

    // se chegou aqui, quer dizer que não deu erro e ele faz o commit
    await trx.commit()

    // cria um retorno de json automático
    return user
  }
}

module.exports = UserController
