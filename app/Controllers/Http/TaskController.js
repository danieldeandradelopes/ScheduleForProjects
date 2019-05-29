'use strict'
const Task = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const tasks = await Task.query()
      // where => para retornar as tarefas apenas referente ao id de projects
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  // /**
  //  * Render a form to be used for creating a new task.
  //  * GET tasks/create
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  * @param {View} ctx.view
  //  */
  // async create ({ request, response, view }) {
  // }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params }) {
    // pegamos apenas os campos que eu preciso para a criação do projeto (vem do request)
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    // criando um novo project
    // ...data => passamos todas as informações que estão dentro do nosso data
    // auth.user.id => pegamos do nosso auth as informações do usuário logado
    const tasks = await Task.create({
      ...data,
      project_id: params.projects_id
    })

    return tasks
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const tasks = await Task.findOrFail(params.id)

    // aqui no show o para exibir os dados das tabelas que estão relacionadas
    // é diferente, porque aqui temos um único projeto, já no index temos uma lista de projetos

    // // // load => para relacionar ao user do nosso model
    // await tasks.load('user')
    // // // load => para relacionar ao tasks do nosso model
    // await tasks.load('project')
    // // // load => para relacionar ao tasks do nosso model
    // // await tasks.load('file')

    return tasks
  }

  // /**
  //  * Render a form to update an existing task.
  //  * GET tasks/:id/edit
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  * @param {View} ctx.view
  //  */
  // async edit ({ params, request, response, view }) {
  // }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // buscamos o projeto
    const task = await Task.findOrFail(params.id)

    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    // project => nosso objeto
    // data => requisição
    // colocar as informações da requisição (data) dentro do objeto que acabamos de criar (project)
    task.merge(data)

    // salvamos o update
    await task.save()

    // retornamos o task atualizado
    return task
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    // buscamos o projeto
    const task = await Task.findOrFail(params.id)

    // deletamos o projeto em questão
    await task.delete()
  }
}

module.exports = TaskController
