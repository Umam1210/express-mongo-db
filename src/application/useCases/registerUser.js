import { createUserEntity } from '../../domain/entities/User.js';
import  argon2 from 'argon2';

export const registerUser = async ({ name, email, password }, userRepository) => { 

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const passwordHash = await argon2.hash(password);

    const user = createUserEntity({
        name,
        email,
        passwordHash: passwordHash
    })

    return await userRepository.save(user);
}