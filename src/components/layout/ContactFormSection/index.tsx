'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { MaskitoOptions } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import type { ReactElement } from 'react';
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import { ContactFormSchema, type ContactFormValues } from './schema';

const states = [
  ['AC', 'Acre'],
  ['AL', 'Alagoas'],
  ['AP', 'Amapá'],
  ['AM', 'Amazonas'],
  ['BA', 'Bahia'],
  ['CE', 'Ceará'],
  ['DF', 'Distrito Federal'],
  ['ES', 'Espírito Santo'],
  ['GO', 'Goiás'],
  ['MA', 'Maranhão'],
  ['MT', 'Mato Grosso'],
  ['MS', 'Mato Grosso do Sul'],
  ['MG', 'Minas Gerais'],
  ['PA', 'Pará'],
  ['PB', 'Paraíba'],
  ['PR', 'Paraná'],
  ['PE', 'Pernambuco'],
  ['PI', 'Piauí'],
  ['RJ', 'Rio de Janeiro'],
  ['RN', 'Rio Grande do Norte'],
  ['RS', 'Rio Grande do Sul'],
  ['RO', 'Rondônia'],
  ['RR', 'Roraima'],
  ['SC', 'Santa Catarina'],
  ['SP', 'São Paulo'],
  ['SE', 'Sergipe'],
  ['TO', 'Tocantins'],
] as const;

const DIGIT_MASK = /\d/;
const LANDLINE_MASK = [
  '(',
  DIGIT_MASK,
  DIGIT_MASK,
  ')',
  ' ',
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  '-',
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
];
const MOBILE_MASK = [
  '(',
  DIGIT_MASK,
  DIGIT_MASK,
  ')',
  ' ',
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  '-',
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
  DIGIT_MASK,
];

const phoneMaskOptions = {
  mask: ({ value }) =>
    value.replaceAll(/\D/g, '').length > 10 ? MOBILE_MASK : LANDLINE_MASK,
} satisfies MaskitoOptions;

const fieldClassName =
  'h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white transition outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 aria-invalid:border-red-400 aria-invalid:focus:border-red-400 aria-invalid:focus:ring-red-400/30 disabled:cursor-not-allowed disabled:opacity-60';

interface FieldsProperties {
  readonly errors: FieldErrors<ContactFormValues>;
  readonly register: UseFormRegister<ContactFormValues>;
}

interface FieldErrorProperties {
  readonly id: string;
  readonly message?: string;
}

function FieldError({
  id,
  message,
}: FieldErrorProperties): ReactElement | null {
  return message ? (
    <p id={id} role="alert" className="text-sm text-red-300">
      {message}
    </p>
  ) : null;
}

function ContactDetailsFields({
  errors,
  register,
}: FieldsProperties): ReactElement {
  const phoneMaskReference = useMaskito({ options: phoneMaskOptions });
  const phoneRegistration = register('phone');

  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-name"
          className="flex gap-1 text-sm font-medium"
        >
          Nome <span className="text-indigo-300">*</span>
        </label>
        <input
          id="contact-name"
          maxLength={64}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={fieldClassName}
          {...register('name')}
        />
        <FieldError id="contact-name-error" message={errors.name?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-email"
          className="flex gap-1 text-sm font-medium"
        >
          E-mail <span className="text-indigo-300">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          maxLength={128}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={fieldClassName}
          {...register('email')}
        />
        <FieldError id="contact-email-error" message={errors.email?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-phone"
          className="flex gap-1 text-sm font-medium"
        >
          Telefone <span className="text-indigo-300">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          placeholder="(11) 99999-9999"
          maxLength={15}
          aria-required="true"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          className={fieldClassName}
          {...phoneRegistration}
          ref={(element) => {
            phoneRegistration.ref(element);
            phoneMaskReference(element);
          }}
        />
        <FieldError id="contact-phone-error" message={errors.phone?.message} />
      </div>
    </>
  );
}

function LocationFields({ errors, register }: FieldsProperties): ReactElement {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-state"
          className="flex gap-1 text-sm font-medium"
        >
          Estado <span className="text-indigo-300">*</span>
        </label>
        <select
          id="contact-state"
          aria-required="true"
          aria-invalid={Boolean(errors.state)}
          aria-describedby={errors.state ? 'contact-state-error' : undefined}
          className={fieldClassName}
          {...register('state')}
        >
          <option value="">Selecione um estado</option>
          {states.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <FieldError id="contact-state-error" message={errors.state?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-city"
          className="flex gap-1 text-sm font-medium"
        >
          Cidade <span className="text-indigo-300">*</span>
        </label>
        <select
          id="contact-city"
          name="city"
          disabled
          className={fieldClassName}
        >
          <option value="">Selecione uma cidade</option>
        </select>
      </div>
    </>
  );
}

function ContactForm(): ReactElement {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      state: '',
      message: '',
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {})}
      className="grid gap-5 rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:grid-cols-2 sm:p-8"
    >
      <ContactDetailsFields errors={errors} register={register} />
      <LocationFields errors={errors} register={register} />
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label
          htmlFor="contact-message"
          className="flex gap-1 text-sm font-medium"
        >
          Mensagem <span className="text-indigo-300">*</span>
        </label>
        <textarea
          id="contact-message"
          maxLength={512}
          rows={5}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white transition outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 aria-invalid:border-red-400 aria-invalid:focus:border-red-400 aria-invalid:focus:ring-red-400/30"
          {...register('message')}
        />
        <FieldError
          id="contact-message-error"
          message={errors.message?.message}
        />
      </div>
      <p className="text-xs text-slate-400 sm:col-span-2">
        Para sua segurança, seu endereço IP e data/hora serão coletados junto
        com esta mensagem.
      </p>
      <div className="flex justify-end sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-500 px-6 font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Enviar mensagem
        </button>
      </div>
    </form>
  );
}

export function ContactFormSection(): ReactElement {
  return (
    <section
      data-testid="contact-form-section"
      id="contato"
      className="border-b border-slate-700 bg-slate-800 py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase">
            Fale com a gente
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Vamos tirar sua ideia do papel?
          </h2>
          <p className="max-w-md text-slate-300">
            Conte um pouco sobre o que você precisa. Retornaremos pelo e-mail ou
            telefone informado.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
