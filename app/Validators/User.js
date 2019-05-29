'use strict'
// biblioteca de internacionalização do adonis (tradução para diversas linguas)
const Antl = use('Antl')

class User {
  // esse método validadeAll faz com que todos os campos sejam validados
  // mesmo que algum falhar, ele validará o outro
  // sem esse método, ao encontrar um erro em algum campo, ele para a validação
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      // require=> obrigatório
      // unique:users => único na tabela de usuários
      username: 'required|unique:users',
      // email=> precisa ter formato de e-mail
      email: 'required|email|unique:users',
      // confirmed=> requer um campo de confirmação de senha
      password: 'required|confirmed'
    }
  }

  // diz como iremos retornar as mensagens
  get messages () {
    // retornamos a lista de mensagens lá do nosso resources/locales/en/validation.json
    return Antl.list('validation')
  }
}

module.exports = User
