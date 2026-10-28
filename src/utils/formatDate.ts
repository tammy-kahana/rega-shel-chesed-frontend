// הופך תאריך מהשרת (2026-11-03) לפורמט ישראלי (03/11/2026)
export const formatDate = (date: string): string => {
    return date.split('-').reverse().join('/');
}
