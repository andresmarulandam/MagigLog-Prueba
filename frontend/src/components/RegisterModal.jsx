import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const { signup, user } = useAuth();

  console.log('User in context:', user);

  const [isTouched, setIsTouched] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (isTouched) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, isTouched, trigger]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="bg-zinc-700 w-1/3 p-10 rounded-md">
      <h1 className="flex justify-center mb-10">CREAR CUENTA</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label className="block mb-2 text-white">Username</label>
          <input
            type="text"
            {...register('username', { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md mb-6"
          />
        </div>

        <div>
          <label className="block mb-2 text-white">Correo</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md mb-6"
          />
        </div>

        <div>
          <label className="block mb-2 text-white">Contraseña</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md mb-6"
          />
        </div>

        <div>
          <label
            className={`block mb-2 ${
              errors.confirmPassword ? 'text-red-500' : 'text-white'
            }`}
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            onBlur={() => setIsTouched(true)}
            className={`w-full bg-zinc-600 text-white px-4 py-2 rounded-md mb-6 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-zinc-600'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Registrarse
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-blue-400 hover:underline"
        >
          Inicia sesión
        </button>
      </div>

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
};

export default RegisterModal;
