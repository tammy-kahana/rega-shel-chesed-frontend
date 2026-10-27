import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { getErrorMessage } from '../api/getErrorMessage';
import { api } from '../api/api';
import type { AuthResponse } from '../types/user';
import { Link, Navigate } from 'react-router-dom';
import { loginSchema, type LoginFormValues } from '../schemas/authSchemas';
import FormField from '../components/FormField';



function LoginPage() {
    const { login, user } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });
    if (user) {
        return <Navigate to="/tasks" replace />
    }
    const onSubmit = async (data: LoginFormValues) => {
        setServerError(null);
        try {
            const res = await api.post<AuthResponse>('/auth/login', data);
            login(res.data.token, res.data.user);
        } catch (error) {
            setServerError(getErrorMessage(error));
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>התחברות</h2>
            <FormField label='טלפון' id='phone' error={errors.phone?.message}>
                <input id="phone" type="tel" placeholder='0501234567' {...register('phone')} />
            </FormField>
            <FormField label='סיסמה' id='password' error={errors.password?.message}>
                <input id="password" type="password" {...register('password')} />
            </FormField>
            {serverError && <p>{serverError}</p>}
            <button type="submit" disabled={isSubmitting} >{isSubmitting ? "מתחבר..." : "התחברות"}</button>

            <Link to="/register">אין לך חשבון? להרשמה</Link>
        </form>
    )
}

export default LoginPage