import type { ReactNode } from "react"

interface FormFieldProps {
    label: string;
    id: string;
    error?: string;
    children: ReactNode;
}
function FormField({ label, id, error, children }: FormFieldProps) {

    return (
        <div className="mb-4">
            <label htmlFor={id}>{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default FormField