import { z } from 'zod';

export const updatePartnerSchema = z.object({
  phone: z.string().trim().max(30).optional(),
  country: z.string().trim().length(2).optional(),
  messengerUsername: z.string().trim().min(1).max(100).optional(),
  messenger: z.enum(['Telegram', 'WhatsApp']).optional(),
  language: z.string().trim().min(2).max(5).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'Provide at least one partner field to update.',
});

export function validatePartnerUpdate(request, response, next) {
  const result = updatePartnerSchema.safeParse(request.body);
  if (!result.success) {
    return response.status(400).json({
      message: 'Please check the submitted fields.',
      errors: result.error.issues.map(issue => ({ field: issue.path.join('.'), message: issue.message })),
    });
  }
  request.body = result.data;
  return next();
}
