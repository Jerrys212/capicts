import { z } from "zod";

// Auth Users

// USERS

const authSchema = z.object({
    nombre: z.string(),
    apellidoPaterno: z.string(),
    apellidoMaterno: z.string(),
    curp: z.string(),
    email: z.string().email(),
    password: z.string().optional(),
    token: z.string(),
});

export const userSchema = authSchema
    .pick({
        nombre: true,
        apellidoPaterno: true,
        apellidoMaterno: true,
        curp: true,
        email: true,
        token: true,
    })
    .extend({ _id: z.string(), role: z.string() });

export interface User extends z.infer<typeof userSchema> {}
export interface Auth extends z.infer<typeof authSchema> {}
export interface UserLoginForm extends Pick<Auth, "email" | "password"> {}
export interface UserRegisterForm extends Pick<Auth, "nombre" | "apellidoPaterno" | "apellidoMaterno" | "curp" | "email" | "password"> {}
export interface ConfirmToken extends Pick<Auth, "token"> {}

export const groupSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    semanas: z.number().int(),
    cantidadSemanal: z.number(),
    limiteUsuarios: z.number().int(),
    miembros: z.array(
        userSchema.pick({
            _id: true,
            nombre: true,
            apellidoMaterno: true,
            apellidoPaterno: true,
            curp: true,
            email: true,
        })
    ),
    creador: userSchema.pick({
        _id: true,
        nombre: true,
        apellidoMaterno: true,
        apellidoPaterno: true,
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export interface Group extends z.infer<typeof groupSchema> {}
export interface GroupFormData extends Pick<Group, "nombre" | "semanas" | "cantidadSemanal" | "limiteUsuarios"> {}

export const contributionSchema = z.object({
    _id: z.string(),
    grupo: groupSchema.pick({ _id: true, nombre: true, semanas: true, cantidadSemanal: true }),
    miembro: userSchema.pick({ _id: true, nombre: true, apellidoMaterno: true, apellidoPaterno: true, email: true, curp: true }),
    cantidad: z.number(),
    semana: z.number(),
    fechaAportacion: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const contributionFormSchema = z.object({
    grupo: z.string(),
    miembro: z.string(),
    cantidad: z.number(),
    semana: z.number(),
});

export interface Contribution extends z.infer<typeof contributionSchema> {}
export interface ContributionFormData extends z.infer<typeof contributionFormSchema> {}

export const loanSchema = z.object({
    _id: z.string().optional(),
    miembro: userSchema.pick({ _id: true, nombre: true, apellidoMaterno: true, apellidoPaterno: true, email: true, curp: true }),
    cantidad: z.number(),
    semanas: z.number().int(),
    cantidadSemanal: z.number(),
    interes: z.number().default(5),
    totalPagar: z.number(),
    estado: z.enum(["pendiente", "aprobado", "rechazado", "pagado"]).default("pendiente"),
    createdAt: z.string().optional(), // ISO string
    updatedAt: z.string().optional(),
});

export interface Loan extends z.infer<typeof loanSchema> {}
export const loanFormSchema = loanSchema
    .pick({
        cantidad: true,
        semanas: true,
        cantidadSemanal: true,
        interes: true,
        totalPagar: true,
    })
    .extend({ miembro: z.string() });

export interface LoanFormData extends z.infer<typeof loanFormSchema> {}
