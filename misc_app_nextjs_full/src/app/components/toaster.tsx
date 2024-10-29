'use client';

import Toast from 'react-bootstrap/Toast';
import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';

// Define prop types
interface ToasterProps {
    toastercolor: string;
    headerMsg: string;
    bodyMsg: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const Toaster: React.FC<ToasterProps> = ({ toastercolor, headerMsg, bodyMsg, show, setShow }) => {
    return (
        <ToastContainer
            className="p-3"
            position={"top-end"}
            style={{ zIndex: 100 }}
        >
            <Toast bg={toastercolor} onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{headerMsg}</strong>
                </Toast.Header>
                <Toast.Body>{bodyMsg}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default Toaster;