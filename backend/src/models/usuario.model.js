import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // quita los espacios en blanco
    },
    email: {
      type: String,
      required: true,
      unique: true, // no se puede repetir
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['comprador', 'vendedor', 'administrador'],
      default: 'comprador',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Usuario', usuarioSchema);
