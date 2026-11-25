import { z } from 'zod';

export const ticketSchema = z.object({
  category: z.string().trim().min(1, 'Enter a category'),
  title: z.string().trim().min(1, 'Enter a title'),
  description: z.string().trim().min(1, 'Enter a description'),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;
