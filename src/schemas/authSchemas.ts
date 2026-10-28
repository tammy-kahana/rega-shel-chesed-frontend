import * as yup from 'yup'
const phoneRule = yup.string()
    .required('יש להזין מספר טלפון')
    .matches(/^05\d{8}$/, 'מספר טלפון לא תקין');
export const loginSchema = yup.object({
    phone: phoneRule,
    password: yup
        .string()
        .required('יש להזין סיסמה')
})
export const registerSchema = yup.object({
    fullName: yup.string()
        .required('יש להזין שם מלא')
        .min(2, 'שם מלא חייב להכיל לפחות 2 אותיות')
        .max(60, 'שם מלא יכול להכיל עד 60 אותיות'),
    phone: phoneRule,
    password: yup
        .string()
        .required('יש להזין סיסמה')
        .min(8, 'סיסמה חייבת להכיל לפחות 8 תווים').max(72, 'סיסמה יכולה להכיל עד 72 תווים')
        .matches(/[A-Za-z]/, 'הסיסמה חייבת להכיל לפחות אות אחת באנגלית')
        .matches(/\d/, 'הסיסמה חייבת להכיל לפחות ספרה אחת'),
})
export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type RegisterFormValues = yup.InferType<typeof registerSchema>;