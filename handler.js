import { nanoid } from 'nanoid'
import books from './books.js'

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = readPage === pageCount
  const newBooks = {
    name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, insertedAt, updatedAt
  }
  if (!name) {
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
  books.push(newBooks)
  const isSuccess = books.filter((b) => b.id === id).length > 0
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query
  if (name) {
    const book = books.filter((obj) => {
      return obj.name.toLowerCase().includes(name.toLowerCase())
    })
    return {
      status: 'success',
      data: {
        books: book.map(({ id, name, publisher }) => ({ id, name, publisher }))
      }
    }
  }
  if (reading) {
    const book = books.filter((obj) => {
      return obj.reading === Boolean(parseInt(reading))
    })
    return {
      status: 'success',
      data: {
        books: book.map(({ id, name, publisher }) => ({ id, name, publisher }))
      }
    }
  }
  if (finished) {
    const book = books.filter((obj) => {
      return obj.finished === Boolean(parseInt(finished))
    })
    return {
      status: 'success',
      data: {
        books: book.map(({ id, name, publisher }) => ({ id, name, publisher }))
      }
    }
  }
  return {
    status: 'success',
    data: {
      books: books.map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
  }
}

const getBookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = books.filter((b) => b.id === id)[0]
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBookByIdHandler = (request, h) => {
  const { id } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updateAt = new Date().toISOString()
  const finished = readPage === pageCount
  const index = books.findIndex((b) => b.id === id)
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updateAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params
  const book = books.findIndex((b) => b.id === id)
  if (book === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }
  books.splice(book, 1)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  })
  response.code(200)
  return response
}

export { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler }
