'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', table => {
      table.increments()
      // vai ser criado por um usuário
      // vamos armazenar o usuário que criou esse projeto
      // iremos fazer um relacionamento via id do usuário
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
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
