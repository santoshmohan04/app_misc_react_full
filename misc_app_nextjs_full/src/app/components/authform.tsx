'use client';
import { useState } from 'react';
import { validateEmail, validatePassword } from '@/lib/validations';

interface AuthFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isRememberMe: boolean;
    toggleRememberMe: () => void;
}

export default function AuthForm({ email, setEmail, password, setPassword, onSubmit, isRememberMe, toggleRememberMe }: AuthFormProps) {
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailBlur = () => {
        setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    };

    const handlePasswordBlur = () => {
        setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3 mt-3">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="pwd">Password:</label>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                    />
                    <button type="button" className="input-group-text" onClick={togglePasswordVisibility}>
                        <em className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'} />
                    </button>
                </div>
                {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="form-check mb-3">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" checked={isRememberMe} onChange={toggleRememberMe} />
                    Remember me
                </label>
            </div>
            <button type="submit" className="btn btn-primary mb-3" disabled={!email || !password || !!errors.email || !!errors.password}>
                Submit
            </button>
        </form>
    )
}