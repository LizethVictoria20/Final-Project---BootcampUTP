export const sessionChecker = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next(); // Si el usuario es administrador, permite continuar
  } else {
    res.status(403).json({ message: 'No autorizado. Requiere permisos de administrador.' });
  }
};

