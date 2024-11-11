'use client';
import '../auth.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { loginUser, setRememberMe } from '@/lib/auth/authSlice';
import AuthForm from '../components/authform';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [apiErr, setApiErr] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();

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
        dispatch(loginUser({ email: email, pswd: password, remeberMe: isRememberMe })); // Dispatch login action
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
                            <h1>Login</h1>
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
                            <p>
                                Already have an Account? <Link href="/signup">Signup</Link>
                            </p>
                        </footer>
                    </div>
                    <div className="circle c1"></div>
                    <div className="circle c2"></div>
                </div>
            )}
        </>
    );
}
