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
        // Check if user details and token are available
        if (usrdtls) {
            const currentTime = Date.now();
            const tokenExpirationTime = usrdtls.stsTokenManager.expirationTime;

            // Check if token is expired
            if (currentTime >= tokenExpirationTime) {
                // Redirect to login if token is expired
                router.push('/login');
            } else {
                // Navigate to products page if token is valid
                router.push('/products');
            }
        }

        // Handle error message display
        if (errMsg) {
            setApiErr(errMsg);
            setShow(true);
        }

        // Set email if available
        setEmail(displayEmail || '');
    }, [usrdtls, errMsg, displayEmail, router]);


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent default form submission
        dispatch(loginUser({ email: email, pswd: password, remeberMe: isRememberMe })).then(() => {
            if (usrdtls) router.push('/products');
        }).catch((err) => { setApiErr(err.message); setShow(true); });
    };

    const toggleRememberMe = () => dispatch(setRememberMe(!isRememberMe));

    return (
        <>
            {isLoading ? (<Spinner animation="border" variant="success" className="text-center" />) : (
                <div className="outer-box">
                    {/* {!isLoading && show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        {apiErr}
                    </Alert>} */}
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
                        <p className='text-danger'>{apiErr}</p>
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
