import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

const RegisterModal = () => {
  const { register, handleSubmit, watch } = useForm();

  const password = watch('password');

  return (
    <div className="bg-zinc-700 max-w-md p-10 rounded-md my-2">
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const res = await registerRequest(values);
          console.log(res);
        })}
      >
        <div>
          <label>Username</label>
          <input
            type="text"
            {...(register('username'), { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            {...(register('email'), { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...(register('password'), { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          />
        </div>

        <div>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md"
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterModal;
