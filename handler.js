import { nanoid } from 'nanoid'
import books from './books.js'
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const insertAt = new Date().toISOString()
  const updatedAt = insertAt
  const finished = pageCount === readPage
  const newBooks = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertAt, updatedAt
  }
  if (name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const isSuccess = books.filter((note) => note.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    books.push(newBooks)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookHandler = () => ({
  status: 'success',
  data: {
    books
  }
})

export { addBookHandler, getAllBookHandler }
