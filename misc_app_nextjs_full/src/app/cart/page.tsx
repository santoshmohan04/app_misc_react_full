'use client';

import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { cart_orders } from "../data/product.data";
import { useAppDispatch } from '../../lib/hooks';
import './cart.css';
import { setUserOrders } from "@/lib/products/productSlice";
import Toaster from "../components/toaster";

export default function Cart() {
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('');
  const [cartValues, setCartValues] = useState(Object.values(cart_orders));
  const [totalAmount, setTotalAmount] = useState(0);
  const today = new Date();
  const dispatch = useAppDispatch();

  // Calculate total amount whenever cart items change
  useEffect(() => {
    const total = cartValues.reduce((acc, item) => Number(acc) + Number(item.totalamt), 0);
    setTotalAmount(total);
  }, [cartValues]);

  const updateTotal = (itemId: string, qty: number) => {
    setCartValues((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;

        const totalamt = (Number(item.price) * qty).toString();
        return { ...item, qty, totalamt };
      })
    );
  };

  const rmCart = (itemId: string) => {
    setCartValues((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartValues([]);
  };

  const confirmOrder = () => {
    const uniqueKey = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch(setUserOrders({
      key: uniqueKey,
      "items": cartValues,
      "orddate": formatDate(today)
    }));
    setToasterMsg('Your order is confirmed. Thank you for shopping with us.')
    setShowToaster(true);
    clearCart();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',    // "Oct"
      day: 'numeric',    // "30"
      year: 'numeric',   // "2024"
      hour: 'numeric',   // "9"
      minute: '2-digit', // "03"
      second: '2-digit', // "01"
      hour12: true       // AM/PM format
    });
  };

  return (
    <div className="containerblock">
      {cartValues.length > 0 ? (
        <>
          <h2>Shopping Cart ({cartValues.length} item/s in your cart)</h2>
          <div className="container">
            <div className="divTable div-hover">
              <div className="rowTable bg-primary text-white pb-2">
                <div className="divTableCol">Product</div>
                <div className="divTableCol">Quantity</div>
                <div className="divTableCol">Price</div>
                <div className="divTableCol">Total</div>
                <div className="divTableCol">Actions</div>
              </div>
              {cartValues.map((item) => (
                <div className="rowTable" key={item.id}>
                  <div className="divTableCol">
                    <div className="media d-flex">
                      <a className="pull-left mr-2 ml-0">
                        <Image
                          src={`/assets/${item.image}`}
                          className="img-fluid"
                          alt={item.name}
                          height={72}
                          width={92}
                        />
                      </a>
                      <div className="media-body">
                        <h4 className="media-heading">{item.name}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="divTableCol">
                    <input
                      type="number"
                      className="form-control"
                      value={item.qty}
                      onChange={(e) => updateTotal(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <div className="divTableCol">
                    <strong>Rs.{Number(item.price)}</strong>
                  </div>
                  <div className="divTableCol">
                    <strong>Rs.{Number(item.totalamt)}</strong>
                  </div>
                  <div className="divTableCol">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => rmCart(item.id)}
                    >
                      <span className="fa fa-remove"></span> Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="rowTable">
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol">
                  <h3>Total</h3>
                </div>
                <div className="divTableCol">
                  <h3>
                    <strong>Rs.{Number(totalAmount)}</strong>
                  </h3>
                </div>
              </div>
              <div className="rowTable">
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol"></div>
                <div className="divTableCol">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={clearCart}
                    disabled={cartValues.length === 0}
                  >
                    Clear
                  </button>
                </div>
                <div className="divTableCol">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={confirmOrder}
                    disabled={totalAmount === 0}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>
          <span>No Items Present in the Cart</span>
        </h2>
      )}
      <Toaster
        toastercolor="success"
        headerMsg="Success"
        bodyMsg={toasterMsg}
        show={showToaster}
        setShow={setShowToaster}
      />
    </div>
  );
}
