import { BookModel } from '../../domain/model/BookModel.js';
import { createBookEntity } from '../../domain/entities/Book.js';

export const createMongoBookRepository = () => ({
  save: async (book) => {
    const doc = new BookModel(book);
    await doc.save();
    return createBookEntity({
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  },

  findById: async (id) => {
    const doc = await BookModel.findById(id);
    return doc
      ? createBookEntity({
          id: doc._id.toString(),
          title: doc.title,
          author: doc.author,
          userId: doc.userId.toString(),
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt
        })
      : null;
  },

  findAll: async () => {
    const docs = await BookModel.find();
    return docs.map((doc) =>
      createBookEntity({
        id: doc._id.toString(),
        title: doc.title,
        author: doc.author,
        userId: doc.userId.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      })
    );
  },

  findByUserId: async (userId) => {
    const docs = await BookModel.find({ userId });
    return docs.map((doc) =>
      createBookEntity({
        id: doc._id.toString(),
        title: doc.title,
        author: doc.author,
        userId: doc.userId.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      })
    );
  },

  updateById: async (id, updateData) => {
    const doc = await BookModel.findById(id);
    if (!doc) return null;

    doc.title = updateData.title;
    doc.author = updateData.author;
    doc.updatedAt = new Date();
    await doc.save();

    return createBookEntity({
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  },

  deleteById: async (id) => {
    await BookModel.findByIdAndDelete(id);
    return true;
  },

  findAllPaginated: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      BookModel.find().skip(skip).limit(limit),
      BookModel.countDocuments()
    ]);

    const books = docs.map((doc) =>
      createBookEntity({
        id: doc._id.toString(),
        title: doc.title,
        author: doc.author,
        userId: doc.userId.toString(),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      })
    );

    return {
      data: books,
      pagination: {
        total,
        page,
        perPage: limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
});
