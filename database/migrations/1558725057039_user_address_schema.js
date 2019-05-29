'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddressSchema extends Schema {
  up () {
    this.create('user_addresses', table => {
      table.increments()
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
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('district')
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_addresses')
  }
}

module.exports = UserAddressSchema
