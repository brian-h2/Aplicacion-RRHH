import { z } from 'zod';

export const jobSchema = z.object({
  title: z
    .string({
      required_error: 'El título es obligatorio',
      invalid_type_error: 'Debe ser texto',
    })
    .min(3, 'Debe tener al menos 3 caracteres')
    .regex(/^[A-Z\s]+$/i, 'Solo letras'),

  company: z
    .string({ required_error: 'La empresa es obligatoria' })
    .min(2, 'Nombre demasiado corto'),

  locationTerm: z
    .string({ required_error: 'La ubicación es obligatoria' })
    .min(2, 'Ubicación inválida'),

  category: z
    .string({ required_error: 'La categoría es obligatoria' }),

  employmentType: z
    .string({ required_error: 'El tipo de empleo es obligatorio' }),

  employmentStyle: z
    .string({ required_error: 'La modalidad es obligatorio' }),

  description: z
    .string({ required_error: 'La descripción es obligatoria' })
    .min(20, 'Debe tener al menos 20 caracteres'),

  salaryRange: z
    .string()
    .optional()
    .refine(v => !v || /^\d+$/.test(v), {
      message: 'El salario debe ser numérico',
    }),

  applicationCode: z
  .string({ required_error: 'La referencia de email es obligatoria' })
  .email('Email inválido'),


  contactEmail: z
    .string({ required_error: 'El email es obligatorio' })
    .email('Email inválido'),

  linkedinLink: z
    .string()
    .url('URL inválida')
    .optional(),
});