import { Link, Navigate } from "react-router-dom";
import { getErrorMessage } from "../api/getErrorMessage";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormValues } from "../schemas/authSchemas";
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "../api/api";
import type { AuthResponse } from "../types/user";
import FormField from "../components/FormField";

function RegisterPage() {
  const { user, login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({ resolver: yupResolver(registerSchema) });
  if (user) {
    return <Navigate to="/tasks" replace />
  }
  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      const res = await api.post<AuthResponse>('/auth/register', data);
      login(res.data.token, res.data.user);
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-md border border-gray-200 bg-white p-8">
      <h2 className="text-center">הרשמה</h2>
      <FormField label='שם מלא' id='fullName' error={errors.fullName?.message}>
        <input id="fullName" type="text" {...register('fullName')} />
      </FormField>
      <FormField label='טלפון' id='phone' error={errors.phone?.message}>
        <input id="phone" type="tel" placeholder='0501234567' {...register('phone')} />
      </FormField>
      <FormField label='סיסמה' id='password' error={errors.password?.message}>
        <input id="password" type="password" {...register('password')} />
      </FormField>
      {serverError && <p className="mb-4 border-s-4 border-red-600 bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      <button className="w-full" type="submit" disabled={isSubmitting} >{isSubmitting ? "נרשם..." : "הרשמה"}</button>
      <Link to="/login" className="mt-4 block text-center text-sm">כבר רשום? להתחברות</Link>
    </form>
  )
}

export default RegisterPage