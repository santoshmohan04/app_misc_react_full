'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { user_orders } from '../data/product.data';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Types for props
type UserDetails = {
    displayName?: string;
    localId: string;
    email: string;
    registered: boolean;
};

type OrderItem = {
    id: string;
    image: string;
    name: string;
    price: number;
};

export default function Settings() {
    const [key, setKey] = useState('password');
    const userOrders = Object.values(user_orders);
    const userItems: any = [];
    const itemDates: any = [];
    userOrders.forEach((element) => {
        userItems.push(element.items);
        itemDates.push(element.orddate);
    });

    const userDetails: UserDetails = {
        displayName: 'Tamire Santhosh Mohan',
        localId: 'a98dbf81-cbe8-4546-a7cf-039d209e210a',
        email: 'santosh_tamire04@msn.com',
        registered: true
    }
    return (
        <div className="container p-5 mt-5">
            <div className="card">
                <div className="card-body">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="password" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                            <OrderList itemDates={itemDates} userItems={userItems} />
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <UserProfile userDetails={userDetails} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

// Component for Change Password Form
const ChangePassword: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Password change logic here
    };

    return (
        <>
            <h5>Change Password</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading ? (
                <div className="loader">Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Enter New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!form.newPassword || form.newPassword !== form.confirmPassword}>
                        Change
                    </button>
                </form>
            )}
        </>
    );
};

// Component for displaying orders
type OrderListProps = {
    itemDates: string[];
    userItems: OrderItem[][];
};

const OrderList: React.FC<OrderListProps> = ({ itemDates, userItems }) => (
    <div>
        {itemDates.map((date, index) => (
            <div className="accordion" id={`accordionExample${index}`} key={index}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={`heading${index}`}>
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                            Ordered Date & Time: {date}
                        </button>
                    </h2>
                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent={`#accordionExample${index}`}>
                        <div className="accordion-body">
                            <OrderTable items={userItems[index]} />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Component for Order Table
type OrderTableProps = {
    items: OrderItem[];
};

const OrderTable: React.FC<OrderTableProps> = ({ items }) => (
    <table className="table table-striped table-hover">
        <thead className="table-dark">
            <tr>
                <th>Item Id</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
                <tr key={item.id}>
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
                    <td>Rs.{item.price}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

// Component for User Profile
type UserProfileProps = {
    userDetails: UserDetails;
};

const UserProfile: React.FC<UserProfileProps> = ({ userDetails }) => (
    <div className="text-center text-primary">
        <h3>User Profile</h3>
        <div className="row">
            <div className="col-sm-3">
                <Image
                    src={`/assets/img/dummy-user.png`}
                    alt={userDetails.displayName || "User"}
                    height={120}
                    width={120}
                />
            </div>
            <div className="col-sm-9">
                <p>Hello: <strong>{userDetails.displayName || "User"}</strong></p>
                <p>User ID: <strong>{userDetails.localId}</strong></p>
                <p>Email: <strong>{userDetails.email}</strong></p>
                <p>Email Verified: <strong>{userDetails.registered ? "Yes" : "No"}</strong></p>
            </div>
        </div>
    </div>
);
