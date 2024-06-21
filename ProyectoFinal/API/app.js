import express from "express";
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./config/config.js";
import usersRouter from "./routes/Users.routes.js";
import productsRouter from "./routes/Products.routes.js";
import categoriesRouter from "./routes/Categories.routes.js";
import authRouter from "./routes/auth.Routes.js";
import { authenticateJWT } from './middleware/jwtMiddleware.js'; // Importamos el middleware JWT
import OrdersRouter from './routes/Orders.Routes.js';
import CartsRoutes from './routes/Carts.Routes.js';
import paymentRouter from './routes/payment.routes.js';
import path from 'path';
const app = express();
const PORT = 3000;

// Configuración de CORS
const corsOptions = {
  origin: '*', // Cambia esto al dominio que quieres permitir
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita el uso de cookies
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir todas las solicitudes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());


// Rutas de autenticación
app.use('/api/auth', authRouter); 
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// Rutas protegidas con JWT
app.use('/api/users', authenticateJWT, usersRouter);
app.use('/api/orders', authenticateJWT, OrdersRouter);
app.use('/api/carts', authenticateJWT, CartsRoutes);
app.use('/api/payment', paymentRouter);
app.use(express.static(path.resolve('public')))

app.use((req, res) => {
  res.status(404).json({
    message: "No se encontró el endpoint",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Problemas con el servidor");
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`El servidor está escuchando en el puerto: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error de conexión con la base de datos:", err);
  });
