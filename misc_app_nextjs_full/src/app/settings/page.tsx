'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import Image from 'next/image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Item, Order, UserOrders } from '../data/product.data';
import { setUserOrders } from '@/lib/products/productSlice';
import { UserData } from '@/lib/auth/data';
import Card from 'react-bootstrap/Card';
import { updatePswd } from '@/lib/auth/authSlice';
import Toaster from '../components/toaster';
import Spinner from 'react-bootstrap/Spinner';
import '../products/products.css';

const TOASTER_MESSAGES = {
    color: "",
    header: "",
    body: ""
};

export default function Settings() {
    const [key, setKey] = useState('password');
    const dispatch = useAppDispatch();
    const userOrders = useAppSelector((state) => state.products.userOrders);
    const ordersCollectionRef = ref(db, "userords");
    const userdetails = useAppSelector((state) => state.auth.loggedInUserDetails);

    useEffect(() => {
        const unsubscribe = onValue(ordersCollectionRef, (snapshot) => {
            const data = snapshot.val() as UserOrders;
            if (data) {
                dispatch(setUserOrders(data));  // Dispatch only if data is new or changed
            }
        });
        return () => unsubscribe(); // Cleanup subscription
    }, [dispatch, ordersCollectionRef]);

    return (
        <div className="container p-5 mt-5">
            <div className="card">
                <div className="card-body">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => k && setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="password" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                            <OrderList itemData={Object.values(userOrders)} />
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <UserProfile userDetails={userdetails} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

// Component for Change Password Form
const ChangePassword: React.FC = () => {
    const [showToaster, setShowToaster] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
    const dispatch = useAppDispatch();

    // Validation function to be used for form and inputs
    const validateForm = () => {
        const newErrors = { newPassword: '', confirmPassword: '' };
        const { newPassword, confirmPassword } = form;

        // Validate new password
        if (!newPassword) {
            newErrors.newPassword = 'Password is required';
        } else if (newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters long';
        } else if (!/[A-Z]/.test(newPassword)) {
            newErrors.newPassword = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(newPassword)) {
            newErrors.newPassword = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(newPassword)) {
            newErrors.newPassword = 'Password must contain at least one number';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            newErrors.newPassword = 'Password must contain at least one special character';
        }

        // Validate confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return !newErrors.newPassword && !newErrors.confirmPassword;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Perform validation before submission
        if (!validateForm()) {
            return; // Prevent form submission if validation fails
        }

        setIsLoading(true);
        dispatch(updatePswd({ pswd: form.confirmPassword }))
            .then(() => {
                setForm({ newPassword: '', confirmPassword: '' });
                setIsLoading(false);
                TOASTER_MESSAGES.color = 'success';
                TOASTER_MESSAGES.header = 'Success';
                TOASTER_MESSAGES.body = 'Password updated successfully';
                setShowToaster(true);
            })
            .catch((error) => {
                setIsLoading(false);
                TOASTER_MESSAGES.color = 'danger';
                TOASTER_MESSAGES.header = 'Error';
                TOASTER_MESSAGES.body = error.message || 'Failed to update password';
                setShowToaster(true);
            });
    };

    // Trigger validation on input blur
    const handleBlur = () => {
        validateForm();
    };

    // Handle changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setForm({ ...form, [field]: e.target.value });
        validateForm();  // Trigger validation on each change
    };

    return (
        <>
            <h5>Change Password</h5>
            {isLoading ? (
                <div className="spinner-container">
                    <Spinner animation="border" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newPassword">Enter New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className="form-control"
                            value={form.newPassword}
                            onChange={(e) => handleChange(e, 'newPassword')}
                            onBlur={handleBlur}  // Trigger validation on blur
                            required
                            minLength={6}
                        />
                        {/* Display error for new password */}
                        {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-control"
                            value={form.confirmPassword}
                            onChange={(e) => handleChange(e, 'confirmPassword')}
                            onBlur={handleBlur}  // Trigger validation on blur
                            required
                            minLength={6}
                        />
                        {/* Display error for confirm password */}
                        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!form.newPassword || form.newPassword !== form.confirmPassword}
                    >
                        Change
                    </button>
                </form>
            )}
            <Toaster
                toastercolor={TOASTER_MESSAGES.color}
                headerMsg={TOASTER_MESSAGES.header}
                bodyMsg={TOASTER_MESSAGES.body}
                show={showToaster}
                setShow={setShowToaster}
            />
        </>
    );
};


// Component for displaying orders
const OrderList: React.FC<{ itemData: Order[] }> = ({ itemData }) => (
    <div>
        {itemData.map((data, index) => (
            <Accordion key={`order-${data.orddate}-${index}`}>
                <Accordion.Item eventKey={`#ordData${index}`} color='#212529'>
                    <Accordion.Header>Ordered Date & Time: {data.orddate}</Accordion.Header>
                    <Accordion.Body>
                        <div className="accordion-body">
                            <MemoizedOrderTable items={data.items} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        ))}
    </div>
);

// Component for Order Table
type OrderTableProps = {
    items: Item[];
};

const OrderTable: React.FC<OrderTableProps> = ({ items }) => (
    <table className="table table-striped table-hover">
        <thead className="table-dark">
            <tr>
                <th>Item Id</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {items.length > 0 && items.map((item, index) => (
                <tr key={`${item.id}-${index}`}>
                    <td>{item.id}</td>
                    <td>
                        <Image
                            src={`/assets/${item.image}`}
                            className="card-img-top"
                            alt={item.name}
                            height={60}
                            width={60}
                        />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>Rs.{item.price}</td>
                    <td>Rs.{item.totalamt}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const MemoizedOrderTable = React.memo(OrderTable);

// Component for User Profile
type UserProfileProps = {
    userDetails: UserData;
};

const UserProfile: React.FC<UserProfileProps> = ({ userDetails }) => {
    if (!userDetails) {
        return <div>No user details available.</div>;
    }

    const defaultPhotoURL = '/assets/img/dummy-user.png';
    const {
        photoURL = defaultPhotoURL,
        displayName = 'User',
        uid,
        email,
        emailVerified,
        createdAt,
        lastLoginAt,
    } = userDetails;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Card style={{ width: '25rem' }}>
            <Image
                src={photoURL}
                alt="User Profile"
                width={150} // Set appropriate width
                height={150} // Set appropriate height
                className='card-img-top'
            />
            <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <Card.Text as="div">
                    <div>Name: <strong>{displayName}</strong></div>
                    <div>User ID: <strong>{uid}</strong></div>
                    <div>Email: <strong>{email}</strong></div>
                    <div>Email Verified: <strong>{emailVerified ? "Yes" : "No"}</strong></div>
                    <div>Created At: <strong>{formattedLoginDate(createdAt)}</strong></div>
                    <div>Last Login: <strong>{formattedLoginDate(lastLoginAt)}</strong></div>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
    );
};

// Function to format date
const formattedLoginDate = (data: string) => {
    const lastLoginAt = data;
    const date = new Date(Number(lastLoginAt));

    // Format month as short name, day as numeric, and year as numeric
    const dateString = date.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    // Format time in hours, minutes, seconds, and specify AM/PM
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
    });

    // Combine date and time
    const readableDate = `${dateString}, ${timeString}`;
    return readableDate;
}
