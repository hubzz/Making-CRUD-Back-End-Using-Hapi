// const { query } = require("@hapi/hapi/lib/validation");
const { nanoid } = require("nanoid");
const notes = require("./notes");

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(10);
  const finished = false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (!name) {
    const response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }
  const temp_note = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  notes.push(temp_note);
  for (let [key, value] of Object.entries(notes[notes.length - 1])) {
    if (value === undefined) {
      const response = h
        .response({
          status: "error",
          message: "Buku gagal ditambahkan",
        })
        .code(500);
      return response;
    }
  }
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: "error",
      message: "Buku gagal ditambahkan",
    })
    .code(500);
  return response;
};

const showBook = (request, h) => {
  const temp_note = [...notes];
  var query = request.query;

  if (query.finished) {
    query.finished = !!+query.finished;
  }
  if (query.reading) {
    query.reading = !!+query.reading;
  }
  if (query.finished && query.reading) {
    query.finished = !!+query.finished;
    query.reading = !!+query.reading;
  }
  if (query.name) {
    query.name = query.name.toLowerCase();
  }

  const isSimmilarity = (a, b) => {
    const temp = a.localeCompare(b, undefined, { sensitivity: "base" }) === 0;
    return temp;
  };

  users = notes.filter((item) => {
    for (var key in query) {
      if (key !== "name") {
        if (item[key] === undefined || item[key] !== query[key]) return false;
      } else if (!isSimmilarity(item[key].toLowerCase(), query[key]))
        return false;
    }

    return true;
  });

  if (query.name || query.finished || query.reading) {
    books = users.map((note) => ({
      id: note.id,
      name: note.name,
      publisher: note.publisher,
    }));
    const response = h
      .response({
        status: "success",
        data: { books },
      })
      .code(200);
    return response;
  }
  books = notes.map((note) => ({
    id: note.id,
    name: note.name,
    publisher: note.publisher,
  }));
  const response = h
    .response({
      status: "success",
      data: { books },
    })
    .code(200);
  return response;
};

const showbooksbyId = (request, h) => {
  const { bookId } = request.params;
  const note = notes.filter((note) => note.id === bookId)[0];
  if (note !== undefined) {
    book = note;
    const response = h
      .response({
        status: "success",
        data: { book },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
  return response;
};

const changebooksbyId = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === bookId);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    if (!notes[index].name) {
      const response = h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
      return response;
    } else if (notes[index].readPage >= notes[index].pageCount) {
      const response = h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
      return response;
    }
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
    return response;
  }
  const response = h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
  return response;
};

const bookDelete = (request, h) => {
  const { bookId } = request.params;
  const index = notes.findIndex((note) => note.id === bookId);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return response;
  }
  const response = h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
  return response;
};

module.exports = {
  addBook,
  showBook,
  showbooksbyId,
  changebooksbyId,
  bookDelete,
};
