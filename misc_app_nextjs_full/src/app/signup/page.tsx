'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../auth.css';
import Link from 'next/link';
import { signupUser, setRememberMe } from '@/lib/auth/authSlice';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import AuthForm from '../components/authform';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiErr, setApiErr] = useState('');
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const usrdtls = useAppSelector(state => state.auth.loggedInUserDetails);
  const errMsg = useAppSelector(state => state.auth.error);
  const isLoading = useAppSelector(state => state.auth.loading);
  const isRememberMe = useAppSelector(state => state.auth.rememberMe);
  const displayEmail = useAppSelector(state => state.auth.rememberEmail);

  useEffect(() => {
    if (usrdtls) router.push('/products');
    if (errMsg) {
      setApiErr(errMsg);
      setShow(true);
    }
    setEmail(displayEmail || '');
  }, [usrdtls, errMsg, displayEmail, router]);



  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(signupUser({ email: email, pswd: password, remeberMe: isRememberMe })); // Dispatch signup action
  };

  const toggleRememberMe = () => dispatch(setRememberMe(!isRememberMe));

  return (
    <>
      {isLoading ? (<Spinner animation="border" variant="success" className="text-center" />) : (
        <div className="outer-box">
          {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {apiErr}
          </Alert>}
          <div className="inner-box">
            <header className="signup-header">
              <h1>Signup</h1>
              <p>It just takes 30 seconds</p>
            </header>
            <main className="signup-body">
              <AuthForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                isRememberMe={isRememberMe}
                toggleRememberMe={toggleRememberMe}
              />
            </main>

            <footer className="signup-footer">
              <p>Already have an Account? <Link href="/login">Login</Link> </p>
            </footer>

          </div>
          <div className="circle c1"></div>
          <div className="circle c2"></div>
        </div >
      )}
    </>
  )
}