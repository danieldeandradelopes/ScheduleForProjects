'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', table => {
      table.increments()

      // RELACIONAMENTO COM A TABELA PROJECTS
      table
        // tipo
        .integer('project_id')
        // forçar ser apenas valores positivos
        .unsigned()
        // não pode ser nullo o campo de relacionamento com um projeto
        .notNullable()
        // nome do campo que iremos referenciar
        .references('id')
        // em qual tabel nós iremos referenciar
        .inTable('projects')

        // se esse campo for atualizado
        // colocamos cascade, para que o mesmo seja atualizado em todos os nossos relacionamentos
        .onUpdate('CASCADE')
        // se o projeto for deletado as tarefas do mesmo também serão deletadas
        .onDelete('CASCADE')
      // RELACIONAMENTO COM A TABELA USERS

      table
        // tipo
        .integer('user_id')
        // forçar ser apenas valores positivos
        .unsigned()
        // nome do campo que iremos referenciar
        .references('id')
        // em qual tabel nós iremos referenciar
        .inTable('users')
        // se esse campo for atualizado
        // colocamos cascade, para que o mesmo seja atualizado em todos os nossos relacionamentos
        .onUpdate('CASCADE')
        // se o usuário for deletado
        // não deletaremos o projeto, mas setamos o id como NULL
        .onDelete('SET NULL')

      // RELACIONAMENTO COM A TABELA FILES
      table
        // tipo
        .integer('file_id')
        // forçar ser apenas valores positivos
        .unsigned()
        // nome do campo que iremos referenciar
        .references('id')
        // em qual tabel nós iremos referenciar
        .inTable('files')
        // se esse campo for atualizado
        // colocamos cascade, para que o mesmo seja atualizado em todos os nossos relacionamentos
        .onUpdate('CASCADE')
        // se o usuário for deletado
        // não deletaremos o projeto, mas setamos o id como NULL
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      // data que a tarefa precisa estar finalizada
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
