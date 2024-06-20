import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const verifyJwt = promisify(jwt.verify);

export const authenticateJWT = async  (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'No hay token proporcionado' });
  }

  try {
    const decoded = await verifyJwt(token, '12345');
    // console.log('Token decodificado:', decoded);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Token inválido' });
  }
};
