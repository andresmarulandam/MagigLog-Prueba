import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  try {
    const userExist = await Usuario.findOne({ email });

    if (userExist) {
      return res.status(400).json(['Este usuario ya existe, prueba con otro']);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las constraseñas no coinciden' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new Usuario({
      username,
      email,
      password: passwordHash,
      role: role || 'comprador',
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      id: userSaved._id,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await Usuario.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: 'Contraseña invalida' });

    const token = await createAccessToken({
      id: userFound._id,
      role: userFound.role,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      id: userFound._id,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await Usuario.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: 'Usuario no encontrado' });

  res.json({
    id: userFound._id,
    email: userFound.email,
    role: userFound.role,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
