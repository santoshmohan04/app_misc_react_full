'use client';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import './cart.css';
import { fetchCartData, updateTotal, rmCart, clearCart, confirmOrder } from "@/lib/products/productSlice";
import Toaster from "../components/toaster";
import Spinner from 'react-bootstrap/Spinner';

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: string;
  qty: number;
  totalamt: string;
}

interface CartItems {
  [key: string]: CartItem;
}

export default function Cart() {
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state
  const [isClient, setIsClient] = useState(false); // Client-side check
  const dispatch = useAppDispatch();
  const cartValues = useAppSelector((state) => state.products.cartList as CartItems);

  // Ensure that the effect is run only once on the client side after mounting
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);  // Set isClient to true only on the client side
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchCartData())
        .then(() => setLoading(false))
        .catch((error) => {
          setToasterMsg(error.message || 'Failed to fetch cart data');
          setShowToaster(true);
          setLoading(false);
        });
    }
  }, [dispatch, isClient]);

  useEffect(() => {
    // Calculate total amount whenever cart values change
    const total = Object.values(cartValues).reduce((sum, item) => sum + parseFloat(item.totalamt), 0);
    setTotalAmount(total);
  }, [cartValues]);

  // Function to update total based on quantity
  const recalulatetotal = (itemId: string, qty: number) => {
    dispatch(updateTotal({ itemId, qty }))
  }

  // Function to remove an item from the cart
  const removeCart = (itemId: string) => {
    dispatch(rmCart(itemId));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const submitOrder = () => {
    dispatch(confirmOrder())
      .then(() => {
        setToasterMsg('Your order is confirmed. Thank you for shopping with us.');
        setShowToaster(true);
      })
  };

  return (
    <div className="containerblock">
      {isClient && loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <>
          {Object.keys(cartValues).length > 0 ? (
            <>
              <h2>Shopping Cart ({Object.keys(cartValues).length} item/s in your cart)</h2>
              <div className="container">
                <div className="divTable div-hover">
                  <div className="rowTable bg-primary text-white pb-2">
                    <div className="divTableCol">Product</div>
                    <div className="divTableCol">Quantity</div>
                    <div className="divTableCol">Price</div>
                    <div className="divTableCol">Total</div>
                    <div className="divTableCol">Actions</div>
                  </div>
                  {Object.entries(cartValues).map(([id, item]) => (
                    <div className="rowTable" key={id}>
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
                          onChange={(e) => {
                            const newQty = e.target.value;
                            if (newQty === '' || parseInt(newQty, 10) < 1) {
                              recalulatetotal(id, 1);  // Default to 1
                            } else {
                              recalulatetotal(id, parseInt(newQty, 10));
                            }
                          }}
                          min={1}
                        />
                      </div>
                      <div className="divTableCol"><strong>Rs.{Number(item.price)}</strong></div>
                      <div className="divTableCol"><strong>Rs.{Number(item.totalamt)}</strong></div>
                      <div className="divTableCol">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeCart(id)}
                        >
                          <span className="fa fa-remove"></span> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="rowTable">
                    <div className="divTableCol" style={{ gridColumn: 'span 3' }}></div>
                    <div className="divTableCol"><h3>Total</h3></div>
                    <div className="divTableCol"><h3><strong>Rs.{totalAmount}</strong></h3></div>
                  </div>
                  <div className="rowTable">
                    <div className="divTableCol" style={{ gridColumn: 'span 3' }}></div>
                    <div className="divTableCol">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={clearCartItems}
                        disabled={!Object.keys(cartValues).length}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="divTableCol">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={submitOrder}
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
            isClient && !loading && <h2><span>No Items Present in the Cart</span></h2>
          )}
        </>
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
