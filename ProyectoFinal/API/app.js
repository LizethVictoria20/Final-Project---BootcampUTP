import express from "express";
import cors from "cors";
import session from 'express-session';
import sequelize from "./config/config.js";
import usersRouter from "./routes/Users.routes.js";
import productsRouter from "./routes/Products.routes.js";
import categoriesRouter from "./routes/Categories.routes.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.Routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "user_sid",
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1200000,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);

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
