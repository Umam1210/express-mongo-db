
import { setupApp } from './src/app/setupApp.js';
import connectToMongo from './src/config/mongo.js';
import { createMongoUserRepository } from './src/infrastructure/repositories/MongoUserRepository.js';
import { createAuthController } from './src/interfaces/controllers/AuthController.js';

const PORT = 3000;

await connectToMongo();

const userRepo = createMongoUserRepository();
const authController = createAuthController(userRepo);

const app = setupApp({ auth: authController });

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
