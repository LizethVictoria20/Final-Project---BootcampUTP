import express from 'express';
import History from '../models/History.js'; 
import { authenticateJWT } from '../middleware/jwtMiddleware.js';


const router = express.Router();

router.get('/api/users/loginuser', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const history = await History.findAll();
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/api/users/loginuser:userId', authenticateJWT, async (req, res) => {
  try {
    const history = await History.findAll({ where: { userId: req.params.userId } });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/api/users/loginuser:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const history = await History.findByPk(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    await history.update(req.body);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
