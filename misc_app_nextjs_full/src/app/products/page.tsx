'use client';

import './products.css';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setCartList } from '@/lib/products/productSlice';
import { Prodinfo } from '../data/product.data';
import ProductCategory from '../components/productcategory';
import Toaster from '../components/toaster';

export default function Products() {
    const [showToaster, setShowToaster] = useState(false);
    const { cameras, watches, shirts, smartphones } = useAppSelector((state) => state.products.productsList);
    const dispatch = useAppDispatch();

    const addtoCart = useCallback((product: Prodinfo) => {
        const uniqueKey = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        dispatch(setCartList({
            key: uniqueKey,
            product: {
                ...product,
                qty: 1,
                totalamt: product.price
            }
        }));
        setShowToaster(true);
    }, [dispatch]);

    return (
        <>
            <div className="container-fluid" id="content">
                <div className="mt-4 p-5 bg-primary text-white text-center">
                    <h1>Welcome to our Lifestyle Store!</h1>
                    <p>We have the best cameras, watches, shirts, and smartphones for you, all in one place.</p>
                </div>
                <hr />

                <ProductCategory
                    title="Cameras"
                    icon="fas fa-camera"
                    products={cameras}
                    onAddToCart={addtoCart}
                />
                <ProductCategory
                    title="Watches"
                    icon="fas fa-clock"
                    products={watches}
                    onAddToCart={addtoCart}
                />
                <ProductCategory
                    title="Shirts"
                    icon="fas fa-tshirt"
                    products={shirts}
                    onAddToCart={addtoCart}
                />
                <ProductCategory
                    title="Smartphones"
                    icon="fas fa-mobile"
                    products={smartphones}
                    onAddToCart={addtoCart}
                />
            </div>
            <Toaster
                toastercolor="success"
                headerMsg="Success"
                bodyMsg="Added to Cart"
                show={showToaster}
                setShow={setShowToaster}
            />
        </>
    );
}
