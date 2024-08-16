import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true, // no se puede repetir
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendedor',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Producto', productSchema);
