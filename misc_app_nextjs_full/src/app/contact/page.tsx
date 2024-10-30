'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ContactUs() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError('All fields are required');
            return;
        }
        setError(null);
        setIsLoading(true);

        // Add form submission logic here

        setIsLoading(false);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-7">
                    <h3>LIVE SUPPORT</h3>
                    <p style={{ color: 'green' }}>
                        24 hours | 7 days a week | 365 days a year Live Technical Support
                    </p>
                    <p>Our Support Team is available, you can reach us by any of the modes below.</p>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>CONTACT US</h3>
                        </div>
                        <div className="panel-body">
                            {error && <div className="alert alert-danger"><p>{error}</p></div>}
                            {isLoading ? (
                                <div style={{ textAlign: 'center' }}>Loading...</div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            className="form-control"
                                            name="message"
                                            id="message"
                                            rows={6}
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-5 text-center">
                    <Image
                        src={`/assets/img/contact.png`}
                        alt="Who we are"
                        height={200}
                        width={200}
                    /><br /><br />
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Company Information</h3>
                        </div>
                        <div className="panel-body">
                            <dl>
                                <dt>Address:</dt>
                                <dd>New York, NY 10012, US</dd>
                                <br />
                                <dt>Phone:</dt>
                                <dd>Office - 01 234 567 88, 01 234 567 89</dd>
                                <br />
                                <dt>Email:</dt>
                                <dd><a href="mailto:info@example.com">info@example.com</a></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
