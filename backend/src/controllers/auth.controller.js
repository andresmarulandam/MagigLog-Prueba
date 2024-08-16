import Vendedor from '../models/vendedor.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newVendedor = new Vendedor({
      username,
      email,
      password: passwordHash,
    });

    const vendedorSaved = await newVendedor.save();
    const token = await createAccessToken({ id: vendedorSaved._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      id: vendedorSaved._id,
      email: vendedorSaved.email,
      password: vendedorSaved.password,
      createdAt: vendedorSaved.createdAt,
      updatedAt: vendedorSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = (req, res) => {
  res.send('login');
};
