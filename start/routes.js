'use strict'

const Route = use('Route')

// criando uma rota
Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('files/:id', 'FileController.show')

// dentro desse group temos apenas as routes (rotas) para usuários logados
// ou seja, se tiver um token de autenticação
Route.group(() => {
  Route.post('files', 'FileController.store')

  // criar um rota genérica, onde podemos ter acesso a todos os métodos daquele controller
  // o apiOnly() é porque retiramos o método create e edit do nosso ProjectController
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]))

  // utilizamos esse tipo de rota para pegar uma task de um project
  // assim "dizemos" que não é possível criar uma task sem ter um projeto antes
  // e na rota, sempre teremos antes da task o id do projeto que ela pertence
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
