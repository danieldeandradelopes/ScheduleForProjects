'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    // para nós buscarmos um arquivo dentro do nosso db
    const file = await File.findOrFail(params.id)

    // aqui retornamos esse arquivo em formato de imagem
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
  async store ({ request, response }) {
    try {
      // verificando se na requisição existe um arquivo com o nome file, caso não ele só da um return e sai
      if (!request.file('file')) return

      // estamos pegando o arquivo e dizendo que ele terá um tamanho máximo de 2mb
      const upload = request.file('file', { size: '2mb' })

      // aqui geramos um novo nome para esse arquivo
      // date.now() => será o nome
      // upload.subtype => extensão do arquivo
      const fileName = `${Date.now()}.${upload.subtype}`

      // fazer literalmente o upload, criamos uma tmpPath (será apenas para desenvolvimento e nã produção)
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // vericar se o processo de upload deu certo
      // if (!upload.moved()) => deu errado
      if (!upload.moved()) {
        throw upload.error()
      }

      // aqui iremos criar um novo registro no banco de dados, na tabela file

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      // para garantir que deu tudo certo
      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload do arquivo' } })
    }
  }
}

module.exports = FileController
