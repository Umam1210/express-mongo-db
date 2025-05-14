import { createAuthRoutes } from "../../interfaces/routes/authRoutes.js";


export const registerRoutes = (app, controllers) => { 

    app.use('/auth', createAuthRoutes(controllers.auth));
}