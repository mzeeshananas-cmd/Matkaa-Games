import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    fullName: z.string().trim().min(1).max(100).optional(),
    lastName: z.string().trim().min(1).max(100).optional(),
    email: z.string().trim().email().max(254).optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'Provide at least one profile field to update.',
  });

export function validateUpdateProfile(request, response, next) {
  const result = updateProfileSchema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).json({
      message: 'Please check the submitted fields.',
      errors: result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  request.body = result.data;
  return next();
}