import * as yup from 'yup'
export const taskSchema = yup.object({
    title: yup.string()
        .required('יש להזין כותרת משימה')
        .min(3, 'כותרת משימה חייבת להכיל לפחות 3 תווים')
        .max(80, 'כותרת משימה יכולה להכיל עד 80 תווים'),
    description: yup.string()
        .required('יש להזין תיאור משימה')
        .min(10, 'תיאור משימה חייב להכיל לפחות 10 תווים')
        .max(1000, 'תיאור משימה יכול להכיל עד 1000 תווים'),
    type: yup.string()
        .required('יש לבחור סוג משימה'),
    area: yup.string()
        .required('יש לבחור אזור'),
    date: yup.string()
        .required('יש לבחור תאריך'),
    time: yup.string()
        .required('יש לבחור שעה'),
    volunteersNeeded: yup.number()
        .required('יש לבחור כמות מתנדבים')
        .integer('יש להזין מספר שלם')
        .typeError('יש להזין מספר')
        .min(1, 'משימה חייבת להכיל לפחות מתנדב אחד')
        .max(20, 'משימה יכולה להכיל עד 20 מתנדבים'),
    privateDetails: yup.string()
        .max(500, 'פרטים למתנדבים יכולים להכיל עד 500 תווים')
})
export type TaskFormValues = yup.InferType<typeof taskSchema>;