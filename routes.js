import { addBookHandler, getAllBookHandler } from './handler.js'
const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
    options: {
      cors: {
        origin: ['*']
      }
    }
  }

]

export default routes
