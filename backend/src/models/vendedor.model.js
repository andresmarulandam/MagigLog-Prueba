import mongoose from 'mongoose';

const vendedorSchema = mongoose.Schema({
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
});

export default mongoose.model('Vendedor', vendedorSchema);
