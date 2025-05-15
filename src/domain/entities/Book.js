export const createBookEntity = ({ title, author, userId }) => {
    if (!title || !author || !userId) {
      throw new Error('Missing required book fields');
    }
  
    return {
      title,
      author,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
  