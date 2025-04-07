import { z } from "zod";

export const LoginFormSchema = () =>
  z.object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });

export const SignUpFormSchema = () =>
  z
    .object({
      name: z
        .string()
        .min(1, {
          message: "Name is required",
        })
        .max(50, {
          message: "Name must be at most 50 characters long",
        }),
      email: z.string().email({
        message: "Invalid email address",
      }),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
      }),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

export const CelebrityFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(1, {
        message: "Name is required",
      })
      .max(50, {
        message: "Name must be at most 50 characters long",
      }),
    dob: z
      .string()
      .min(1, {
        message: "Date of birth is required",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date of birth must be in YYYY-MM-DD format",
      }),
    bio: z.string().min(1, {
      message: "Bio is required",
    }),
    roles: z.array(z.string()).min(1, {
      message: "At least one role is required",
    }),
    avatar: z.string().url({
      message: "Invalid URL",
    }),
    images: z.array(z.string().url()).optional(),
  });

export const MovieFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(1, {
        message: "Name is required",
      })
      .max(50, {
        message: "Name must be at most 50 characters long",
      }),
    year_of_release: z
      .string()
      .min(1, {
        message: "Year of release is required",
      })
      .regex(/^\d{4}$/, {
        message: "Year of release must be in YYYY format",
      }),
    plot: z.string().min(1, {
      message: "Plot is required",
    }),
    producer_id: z.string().min(1, {
      message: "Producer ID is required",
    }),
    actor_ids: z.array(z.string()).min(1, {
      message: "At least one actor ID is required",
    }),
    avatar: z.string().url({
      message: "Invalid URL",
    }),
    images: z.array(z.string().url()).optional(),
  });
