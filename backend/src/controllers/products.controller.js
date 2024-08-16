import Product from '../models/producto.model.js';

export const createProduct = async (req, res) => {
  try {
    const { name, sku, quantity, price } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User ID is required' });
    }

    const newProduct = new Product({
      name,
      sku,
      quantity,
      price,
      user: req.user.id,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    if (req.user.role === 'administrador') {
      const products = await Product.find().populate('user');
      return res.json(products);
    }

    const products = await Product.find({ user: req.user.id }).populate(
      'vendedor',
    );
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('user');

    if (!product)
      return res.status(404).json({ message: 'Producto no encontrado' });

    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, sku, quantity, price } = req.body;
  try {
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ essage: 'Producto no encontrado' });

    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        sku,
        quantity,
        price,
      },
      { new: true, runValidators: true },
    );
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
