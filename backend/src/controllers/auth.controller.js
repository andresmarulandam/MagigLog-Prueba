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

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendedorEncontrado = await Vendedor.findOne({ email });

    if (!vendedorEncontrado)
      return res.status(400).json({ message: 'Vendedor not found' });

    const isMatch = await bcrypt.compare(password, vendedorEncontrado.password);

    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = await createAccessToken({ id: vendedorEncontrado._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      id: vendedorEncontrado._id,
      email: vendedorEncontrado.email,
      password: vendedorEncontrado.password,
      createdAt: vendedorEncontrado.createdAt,
      updatedAt: vendedorEncontrado.updatedAt,
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
  const vendedorEncontrado = await Vendedor.findById(req.decoded.id);

  if (!vendedorEncontrado)
    return res.status(400).json({ message: 'Vendedor no encontrado' });

  res.json({
    id: vendedorEncontrado._id,
    email: vendedorEncontrado.email,
    password: vendedorEncontrado.password,
    createdAt: vendedorEncontrado.createdAt,
    updatedAt: vendedorEncontrado.updatedAt,
  });
};
