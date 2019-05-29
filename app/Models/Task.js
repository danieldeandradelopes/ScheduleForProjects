'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  // boot() => como se fosse um constructor
  static boot () {
    super.boot()

    // afterCreate => depois da task ser criada ou alterada
    // TaskHook.sendNewTaskEmail => vem lá do nosso models/hooks/
    this.addHook('afterCreate', 'TaskHook.sendNewTaskEmail')

    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskEmail')
  }

  // criando relacionamentos
  project () {
    // uma tarefa pertence a um projeto
    return this.belongsTo('App/Models/Project')
  }

  // criando relacionamentos
  user () {
    // uma tarefa pertence a um usuário
    return this.belongsTo('App/Models/User')
  }

  // criando relacionamentos
  file () {
    // uma tarefa pode ter 1 arquivo
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
