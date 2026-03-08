import { z } from "zod";

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Admin login validation
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Team member validation
export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .max(100, "Role must be less than 100 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").nullable().optional(),
  avatar_url: z.string().url("Must be a valid URL").max(500).nullable().optional().or(z.literal("")),
  linkedin_url: z.string().url("Must be a valid URL").max(500).nullable().optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid URL").max(500).nullable().optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid URL").max(500).nullable().optional().or(z.literal("")),
  display_order: z.number().int().min(0).max(9999).nullable().optional(),
  category: z.string().max(50, "Category must be less than 50 characters").nullable().optional(),
});

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// Sanitize string to prevent XSS
export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
