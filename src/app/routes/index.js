import { createAuthRoutes } from "../../interfaces/routes/authRoutes.js";
import bookRoutes from '../../interfaces/routes/bookRoutes.js'



export const registerRoutes = (app, controllers) => { 

    app.use('/auth', createAuthRoutes(controllers.auth));
    app.use('/books', bookRoutes);
}