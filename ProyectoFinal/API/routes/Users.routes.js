import express from 'express';
import User from '../models/User.js'
import { isAdmin } from '../middleware/authMiddleware.js';
import { authenticateJWT } from "../middleware/jwtMiddleware.js";

const router = express.Router();

router.get('/', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/loginuser', authenticateJWT, async (req, res) => {
  const id = req.user.userId;

  try {
    // Verificar que el id esté presente
    if (!id) {
      return res.status(400).json({ error: 'El ID de usuario no está presente en el token.' });
    }

    const user = await User.findOne({ where: { user_id: id } });

    // Verificar si se encontró el usuario
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    // Diferenciar entre errores de base de datos y otros tipos de errores
    if (err.name === 'SequelizeDatabaseError') {
      console.error('Error de base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor. Por favor, inténtelo más tarde.' });
    } else {
      console.error('Error desconocido:', err);
      res.status(500).json({ error: 'Error desconocido. Por favor, inténtelo más tarde.' });
    }
  }
});


router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/user', authenticateJWT, async (req, res) => {
  try {
    // Obtén el email de los query parameters
    const email = req.user.email;
    
    // Log para debugging
    console.log(email);

    // Buscar usuario por email
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    // Manejo de caso donde el usuario no es encontrado
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Responder con el usuario encontrado
    res.user;

  } catch (err) {
    // Log del error y respuesta de error del servidor
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      }
      await user.update(req.body);
      res.json(user);
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
