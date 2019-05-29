'use strict'

const TaskHook = (exports = module.exports = {})

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

// enviar email para o usuário quando ele é relacionado a uma task
TaskHook.sendNewTaskEmail = async taskInstance => {
  // verifica se o campo user id existe e se foi recentemente alterada
  // visto que se o user id não for alterado não precisamos informar o usuário
  // dirty => informações novas (editado recentemente)
  // só quando altera um id ou cria uma nova task
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // traz qual user está relacionado com essa task
  // taskInstance.user() => pega o relacionamento com usuários, podemos, porque foi criado no model
  const { email, username } = await taskInstance.user().fetch()

  // mesma operação de cima
  const file = await taskInstance.file().fetch()

  // pegamos o title que vem na task instance
  const { title } = taskInstance

  // estamos enviando para o nosso NewTaskMail (App/Jobs)
  // attempts => qtd de vezes que tentará enviar esse email caso falhe
  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
