export const createUserRepository = () => ({
    findByEmail: async (email) => {
        return null; 
    },
    save: async (user) => {
        return user;
    }
})