import routes from './routes.js'
import Hapi from '@hapi/hapi'

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'
  })
  server.route(routes)
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
