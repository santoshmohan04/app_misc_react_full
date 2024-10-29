'use client';

import React, { useState, useEffect } from "react";
import { cart_orders } from "../data/product.data";

export default function Cart() {
  const [cartValues, setCartValues] = useState(Object.values(cart_orders));
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount whenever cart items change
  useEffect(() => {
    const total = cartValues.reduce((acc, item) => acc + item.totalamt, 0);
    setTotalAmount(total);
  }, [cartValues]);

  const updateTotal = (itemId: string, qty: number) => {
    setCartValues((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, qty, totalamt: item.price * qty } : item
      )
    );
  };

  const rmCart = (itemId: string) => {
    setCartValues((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartValues([]);
  };

  const confirmOrder = () => {
    alert("Order Confirmed");
    clearCart();
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
                        <img
                          className="img-fluid"
                          src={`/assets/${item.image}`}
                          alt="product"
                          style={{ width: "92px", height: "72px", marginLeft: "0" }}
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
                    <strong>Rs.{item.price.toFixed(2)}</strong>
                  </div>
                  <div className="divTableCol">
                    <strong>Rs.{item.totalamt.toFixed(2)}</strong>
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
                    <strong>Rs.{totalAmount.toFixed(2)}</strong>
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
    </div>
  );
}
