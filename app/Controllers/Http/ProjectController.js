'use strict'
const Project = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } = request.get()
    // query => inicia uma nova query (ação)
    // .with('user') => vai fazer o relacionamento com a table usuários,
    // para podermos acessar informações completas do usuário em todos os nossos projetos, obs.: tem que ser user porque é o nome do
    // relacionamento vindo lá do nosso model
    // fetch() => finaliza a query
    // paginate(1) => cria paginação e começa na página 1
    const projects = await Project.query()
      .with('user')
      // .fetch()
      .paginate(page)

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    // pegamos apenas os campos que eu preciso para a criação do projeto (vem do request)
    const data = request.only(['title', 'description'])

    // criando um novo project
    // ...data => passamos todas as informações que estão dentro do nosso data
    // auth.user.id => pegamos do nosso auth as informações do usuário logado
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    // aqui no show o para exibir os dados das tabelas que estão relacionadas
    // é diferente, porque aqui temos um único projeto, já no index temos uma lista de projetos

    // load => para relacionar ao user do nosso model
    await project.load('user')
    // load => para relacionar ao tasks do nosso model
    await project.load('tasks')

    return project
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    // buscamos o projeto
    const project = await Project.findOrFail(params.id)

    // pegamos no body (title e description)
    const data = request.only(['title', 'description'])

    // project => nosso objeto
    // data => requisição
    // colocar as informações da requisição (data) dentro do objeto que acabamos de criar (project)
    project.merge(data)

    // salvamos o update
    await project.save()

    // retornamos o project atualizado
    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    // buscamos o projeto
    const project = await Project.findOrFail(params.id)

    // deletamos o projeto em questão
    await project.delete()
  }
}

module.exports = ProjectController
