import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: 'El username es requerido ',
      })
      .min(2),
    email: z
      .string({
        required_error: 'El email es requerido',
      })
      .email({
        message: 'El email no es valido',
      }),
    password: z
      .string({
        required_error: 'La contraseña es requerida',
      })
      .min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
      }),
    confirmPassword: z
      .string({ required_error: 'La confirmacion de contraseña es requerida' })
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email is not valid',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6),
});
