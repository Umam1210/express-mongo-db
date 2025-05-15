export const createBookEntity = ({id, title, author, userId }) => {
    if (!title || !author || !userId) {
      throw new Error('Missing required book fields');
    }
  
  return {
      id,
      title,
      author,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
  