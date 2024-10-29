'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../auth.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      // Perform login logic here
      console.log('Logging in with:', { email, password });
      router.push('/login');
      // Store email in local storage if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      // You can also navigate to a different page or call an API
    }
  };

  const handleEmailBlur = () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Email is invalid' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="outer-box">
      <div className="inner-box">
        <header className="signup-header">
          <h1>Signup</h1>
          <p>It just takes 30 seconds</p>
        </header>
        <main className="signup-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
            </div>
            {errors.email && <div className="text-danger">{errors.email}</div>}
            <div className="mb-3">
              <label htmlFor="pwd">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter password"
                  name="pswd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <em
                    className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}
                  >
                    {/* Icon based on showPassword */}
                  </em>
                </button>
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="form-check mb-3">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
            </div>
            <Button type="submit" variant="primary" className="mb-3" disabled={!email || !password || !!errors.email || !!errors.password}>
              Submit
            </Button>
          </form>
        </main>

        <footer className="signup-footer">
          <p>Already have an Account? <Link href="/login">Login</Link> </p>
        </footer>

      </div>
      <div className="circle c1"></div>
      <div className="circle c2"></div>
    </div >
  )
}