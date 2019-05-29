'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  // diz quantos jobs queremos processar simultaneamente
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  // é uma chave única para cada job da nossa aplicação
  static get key () {
    return 'NewTaskMail-job'
  }

  // This is where the work is done.
  // lógica para o nosso envio de email (nesse caso)
  async handle ({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`)

    // enviando o email após a task ser criada ou alterada (se o campo de id do usuario for alterado)
    await Mail.send(
      // vamos criar um novo template para o email
      // !! => faz com que uma variável vire sempre booleano - se existir um valor = true, se não existir = false
      ['emails.new_task'],
      // dizemos quais campos iremos passar para esse email
      {
        username,
        title,
        hasAttachment: !!file
      },
      // configuramos a mensagem
      // para quem
      // de quem
      // e a mensagem em si
      message => {
        message
          .to(email)
          .from('danieldeandradelopes@gmail.com', 'Daniel | JACODE')
          .subject('Nova tarefa para você!')

        // se ele encontrar um relacionamento com o file,
        // nós iremos adicionar um anexo a essa tarefa
        if (file) {
          // eslint-disable-next-line no-unused-expressions
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
