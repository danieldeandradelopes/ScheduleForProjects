'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

// dentro do env nós temos a url do nosso app
const Env = use('Env')

class File extends Model {
  // criamos aqui um campo que não existe no nosso db,
  // mas esse campo será a url para esse arquivo
  // então, funcionará como um campo virtual para mostrar o arquivo

  static get computed () {
    return ['url']
  }

  // para retornar uma url para usarmos no nosso fronted
  getUrl ({ id }) {
    // criamos uma url padrão para ver os arquivos
    // combinamos a url original com a rota (routes.js) get do nosso files
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
