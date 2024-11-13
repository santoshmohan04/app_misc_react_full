'use client';

import './products.css';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart, setProducts } from '@/lib/products/productSlice';
import { Prodinfo } from '../data/product.data';
import ProductCategory from '../components/productcategory';
import Toaster from '../components/toaster';
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import Spinner from 'react-bootstrap/Spinner';

const productsCollectionRef = ref(db, "prodlist");

const TOASTER_MESSAGES = {
    color: "success",
    header: "Success",
    body: "Added to Cart"
};

export default function Products() {
    const [showToaster, setShowToaster] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const { cameras, watches, shirts, smartphones } = useAppSelector(state => state.products.productsList);
    const dispatch = useAppDispatch();

    const addItemToCart = (product: Prodinfo) => {
        dispatch(addToCart(product))
            .then(() => {
                setShowToaster(true);
            })
    };


    useEffect(() => {
        setIsClient(true);
        const unsubscribe = onValue(productsCollectionRef, (snapshot) => {
            const data = snapshot.val();
            if (data) dispatch(setProducts(data));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <Spinner animation="border" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>) : (isClient && !loading && cameras.length > 0 && <div className="container-fluid" id="content">
                    <div className="mt-4 p-5 bg-primary text-white text-center">
                        <h1>Welcome to our Lifestyle Store!</h1>
                        <p>We have the best cameras, watches, shirts, and smartphones for you, all in one place.</p>
                    </div>
                    <hr />
                    <ProductCategory title="Cameras" icon="bi bi-camera" products={cameras} onAddToCart={addItemToCart} />
                    <ProductCategory title="Watches" icon="bi bi-watch" products={watches} onAddToCart={addItemToCart} />
                    <ProductCategory title="Shirts" icon="bi bi-bag-check" products={shirts} onAddToCart={addItemToCart} />
                    <ProductCategory title="Smartphones" icon="bi bi-phone" products={smartphones} onAddToCart={addItemToCart} />
                </div>)}
            <Toaster
                toastercolor={TOASTER_MESSAGES.color}
                headerMsg={TOASTER_MESSAGES.header}
                bodyMsg={TOASTER_MESSAGES.body}
                show={showToaster}
                setShow={setShowToaster}
            />
        </>
    );
}
