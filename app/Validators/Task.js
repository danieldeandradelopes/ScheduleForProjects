'use strict'
const Antl = use('Antl')
class Task {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      title: 'required',
      // validando para ser uma data
      due_date: 'date'
    }
  }
  // diz como iremos retornar as mensagens
  get messages () {
    // retornamos a lista de mensagens lá do nosso resources/locales/en/validation.json
    return Antl.list('validation')
  }
}

module.exports = Task
