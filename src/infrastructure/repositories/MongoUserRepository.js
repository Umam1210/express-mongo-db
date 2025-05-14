import mongoose from "mongoose";
import { createUserEntity } from "../../domain/entities/User.js";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model("User", userSchema);

export const createMongoUserRepository = () => ({
    findByEmail: async (email) => {
      const doc = await UserModel.findOne({ email });
      return doc ? createUserEntity({ id: doc._id.toString(), name: doc.name, email: doc.email, passwordHash: doc.passwordHash }) : null;
    },
    save: async (user) => {
      const doc = new UserModel({
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash
      });
      await doc.save();
      return createUserEntity({ id: doc._id.toString(), ...user });
    }
  });