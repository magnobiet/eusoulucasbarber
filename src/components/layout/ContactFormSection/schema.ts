import { z } from 'zod';
import { isValidBrazilianPhone } from '~/utils';

const EmailSchema = z
  .string()
  .min(1, 'Informe seu e-mail')
  .pipe(z.email('Informe um e-mail válido'));

const BrazilianPhoneSchema = z
  .string()
  .min(1, 'Informe seu telefone')
  .max(15)
  .refine(isValidBrazilianPhone, 'Informe um telefone válido');

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres')
    .max(64, 'O nome deve ter no máximo 64 caracteres'),
  email: EmailSchema,
  phone: BrazilianPhoneSchema,
  state: z.string().min(1, 'Selecione um estado'),
  message: z
    .string()
    .trim()
    .min(10, 'A mensagem deve ter pelo menos 10 caracteres')
    .max(512, 'A mensagem deve ter no máximo 512 caracteres'),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
