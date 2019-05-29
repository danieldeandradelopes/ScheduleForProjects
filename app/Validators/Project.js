'use strict'
const Antl = use('Antl')

class Project {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      title: 'required',
      description: 'required'
    }
  }

  // diz como iremos retornar as mensagens
  get messages () {
    // retornamos a lista de mensagens lá do nosso resources/locales/en/validation.json
    return Antl.list('validation')
  }
}

module.exports = Project
