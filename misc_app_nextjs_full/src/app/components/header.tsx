'use client';

import {useAppSelector, useAppDispatch } from '../../lib/hooks'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setUser } from '@/lib/auth/authSlice';


export default function Header() {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logoutUser = () => {
        setShow(false);
        dispatch(setUser(null));
        router.push('/login');
    };

    const useremail = useAppSelector((state) => state.user.email);

    return (
        <>
            <Navbar bg="dark" collapseOnSelect expand="lg" data-bs-theme="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <i className="bi bi-shop"></i> Lifestyle Store
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {useremail ? (
                                <>
                                    <Nav.Link href="/products">
                                        <i className="fab fa-product-hunt"></i> Products
                                    </Nav.Link>
                                    <NavDropdown title={<><i className="bi bi-person-circle"></i> {useremail}</>} id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="/cart">
                                            <i className="bi bi-bag-check"></i> Cart
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/settings">
                                            <i className="bi bi-gear"></i> Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleShow}>
                                            <i className="bi bi-box-arrow-in-right"></i> Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <Nav.Link href="/login">
                                    <i className="bi bi-box-arrow-in-right"></i> Login
                                </Nav.Link>
                            )}
                            <Nav.Link href="/contact">
                                <i className="bi bi-question-circle"></i> Contact Us
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Logout Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-5 text-center">
                        <div className="delete-icon">
                            <i className="bi-trash"></i>
                        </div>
                        <h4 className="text-center">Are you sure you wish to Log out</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={logoutUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}