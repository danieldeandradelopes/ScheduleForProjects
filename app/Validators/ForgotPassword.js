'use strict'
const Antl = use('Antl')
class ForgotPassword {
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
      // email=> precisa ter formato de e-mail
      email: 'required|email',
      // confirmed=> requer um campo de confirmação de senha
      redirect_url: 'required|url'
    }
  }
  // diz como iremos retornar as mensagens
  get messages () {
    // retornamos a lista de mensagens lá do nosso resources/locales/en/validation.json
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
