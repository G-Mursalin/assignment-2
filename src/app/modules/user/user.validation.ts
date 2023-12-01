import { z } from 'zod';

const createUserValidationSchema = z.object({
  userId: z.number({
    required_error: 'User ID is required',
    invalid_type_error: 'User ID must be a number',
  }),
  username: z
    .string({
      required_error: 'User name is required',
      invalid_type_error: 'User Name must be a string',
    })
    .trim()
    .refine((val) => val.trim().length >= 3, {
      message: 'User name should be minimum 3 character long',
    }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  fullName: z.object({
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'First name must be a string',
      })
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please provide a valid first name',
      }),
    lastName: z
      .string({
        required_error: 'Last name is required',
        invalid_type_error: 'Last name must be a string',
      })
      .trim()
      .refine((val) => val.trim().length > 0, {
        message: 'Please provide a valid last name',
      }),
  }),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .positive({ message: 'Age can not be negative number or zero' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a number',
    })
    .email('Invalid email address'),
  isActive: z.boolean().optional().default(true),
  hobbies: z
    .array(
      z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be a staring',
      }),
      {
        required_error: 'Array of hobbies is required',
        invalid_type_error: 'Hobbies must be in a array',
      },
    )
    .nonempty({ message: "Hobbies can't be empty" }),
  address: z.object(
    {
      street: z
        .string({
          required_error: 'Street is required',
          invalid_type_error: 'Street must be a string',
        })
        .trim()
        .refine((val) => val.trim().length > 0, {
          message: 'Please tell us your valid street name',
        }),
      city: z
        .string({
          required_error: 'City is required',
          invalid_type_error: 'City must be a string',
        })
        .trim()
        .refine((val) => val.trim().length > 0, {
          message: 'Please tell us your valid city name',
        }),
      country: z
        .string({
          required_error: 'Country is required',
          invalid_type_error: 'Country must be a string',
        })
        .trim()
        .refine((val) => val.trim().length > 0, {
          message: 'Please tell us your valid country name',
        }),
    },
    {
      required_error: 'Address is required',
      invalid_type_error: 'Address must be a Object',
    },
  ),
});

const updateUserValidationSchema = z.object({
  userId: z
    .number({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a number',
    })
    .optional(),
  username: z
    .string({
      required_error: 'User name is required',
      invalid_type_error: 'User Name must be a string',
    })
    .trim()
    .refine((val) => val.trim().length >= 3, {
      message: 'User name should be minimum 3 character long',
    })
    .optional(),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .optional(),
  fullName: z
    .object({
      firstName: z
        .string({
          required_error: 'First name is required',
          invalid_type_error: 'First name must be a string',
        })
        .trim()
        .refine((val) => val.trim().length > 0, {
          message: 'Please provide a valid first name',
        })
        .optional(),
      lastName: z
        .string({
          required_error: 'Last name is required',
          invalid_type_error: 'Last name must be a string',
        })
        .trim()
        .refine((val) => val.trim().length > 0, {
          message: 'Please provide a valid last name',
        })
        .optional(),
    })
    .optional(),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
    .positive({ message: 'Age can not be negative number or zero' })
    .optional(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a number',
    })
    .email('Invalid email address')
    .optional(),
  isActive: z.boolean().optional().default(true),
  hobbies: z
    .array(
      z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be a staring',
      }),
      {
        required_error: 'Array of hobbies is required',
        invalid_type_error: 'Hobbies must be in a array',
      },
    )
    .nonempty({ message: "Hobbies can't be empty" })
    .optional(),
  address: z
    .object(
      {
        street: z
          .string({
            required_error: 'Street is required',
            invalid_type_error: 'Street must be a string',
          })
          .trim()
          .refine((val) => val.trim().length > 0, {
            message: 'Please tell us your valid street name',
          })
          .optional(),
        city: z
          .string({
            required_error: 'City is required',
            invalid_type_error: 'City must be a string',
          })
          .trim()
          .refine((val) => val.trim().length > 0, {
            message: 'Please tell us your valid city name',
          })
          .optional(),
        country: z
          .string({
            required_error: 'Country is required',
            invalid_type_error: 'Country must be a string',
          })
          .trim()
          .refine((val) => val.trim().length > 0, {
            message: 'Please tell us your valid country name',
          })
          .optional(),
      },
      {
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a Object',
      },
    )
    .optional(),
});

export const userValidators = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
