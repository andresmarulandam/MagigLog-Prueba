import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  sku: z.string({
    required_error: 'SKU is required',
  }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .min(0, {
      message: 'Quantity cannot be less than 0',
    }),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .min(0, {
      message: 'Price cannot be less than 0',
    }),
  userId: z.string({
    required_error: 'user ID is required',
  }),
});
