export const createUserEntity = ({ id, name, email, passwordHash }) => ({
  id,
  name,
  email,
  passwordHash,
  createdAt: new Date(),
  updatedAt: new Date()
});
