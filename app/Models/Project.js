'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  // criar o relacionamento com o usuário
  user () {
    // belongsTo => diz que um projeto pertence a um usuário
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    // hasMany => diz que um projeto pode ter várias tarefas
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
