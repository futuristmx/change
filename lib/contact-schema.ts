import { z } from "zod";

/**
 * Single source of truth for contact validation — shared by the client form
 * and the server Route Handler so rules can never drift between the two.
 */
export const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Tu nombre, por favor.")
    .max(80, "Demasiado largo."),
  email: z
    .string()
    .trim()
    .min(1, "Necesitamos un correo para responderte.")
    .email("Revisa el formato del correo.")
    .max(120),
  organizacion: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("")),
  decision: z
    .string()
    .trim()
    .min(12, "Cuéntanos un poco más sobre la decisión.")
    .max(2000, "Resúmelo un poco más."),
  // Honeypot — must stay empty (bots fill it).
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
