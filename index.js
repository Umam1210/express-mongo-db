
import express from 'express'
import connectToMongo from './src/config/mongo.js'
import { createMongoUserRepository } from './src/infrastructure/repositories/MongoUserRepository.js'
import { createAuthController } from './src/interfaces/controllers/AuthController.js'
import { createAuthRoutes } from './src/interfaces/routes/authRoutes.js'

const app = express()
const port = 3000

app.use(express.json())

await connectToMongo()

const userRepo = createMongoUserRepository()
const authController = createAuthController(userRepo)
const authRoutes= createAuthRoutes(authController)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})