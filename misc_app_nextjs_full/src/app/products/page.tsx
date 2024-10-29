'use client';

import './products.css';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { setCartlist } from '@/lib/products/productSlice';
import { Prodinfo } from '../data/product.data';
import ProductCategory from '../components/productcategory';

export default function Products() {
    const { cameras, watches, shirts, smartphones } = useAppSelector((state) => state.products.productslist);
    const dispatch = useAppDispatch();

    const addtoCart = useCallback((product:Prodinfo) => {
        dispatch(setCartlist({ ...product, qty: 1, totalamt: product.price }));
    }, [dispatch]);

    return (
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
    );
}
