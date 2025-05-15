import { BookModel } from "../../domain/model/BookModel.js"
import { createBookEntity } from "../../domain/entities/Book.js";

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
    return doc ? createBookEntity({
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }) : null;
  },

  findAll: async () => {
    const docs = await BookModel.find();
    return docs.map(doc =>
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
    return docs.map(doc =>
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
    updateData.updatedAt = new Date();
    const doc = await BookModel.findByIdAndUpdate(id, updateData, { new: true });
    return doc ? createBookEntity({
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      userId: doc.userId.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    }) : null;
  },

  deleteById: async (id) => {
    await BookModel.findByIdAndDelete(id);
    return true;
  }
});
