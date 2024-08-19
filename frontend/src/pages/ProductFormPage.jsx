import { useForm } from 'react-hook-form';
import { useProducts } from '../context/ProductsContext';

function ProductFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createProduct } = useProducts();

  const onSubmit = handleSubmit((data) => {
    createProduct(data);
  });

  return (
    <div className="bg-zinc-700 max-w-md w-full p-10 rounded-md">
      <h1 className="flex  mb-8">CREAR PRODUCTO</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          {...register('nombre')}
          className="w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <label htmlFor="sku">Sku</label>
        <input
          type="text"
          name="sku"
          {...register('sku')}
          className="w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2"
        ></input>

        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="text"
          name="cantidad"
          {...register('cantidad')}
          className="w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2"
        ></input>

        <label htmlFor="cantidad">Precio</label>
        <input
          type="text"
          name="precio"
          {...register('precio')}
          className="w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2"
        ></input>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;
