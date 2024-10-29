'use client';

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import { ProductCategories, prod_cat } from './data/product.data';
import Image from 'next/image'

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {/** Carousel Items **/}
        {['intro-bg_1_.jpg', 'sale-banner.jpg', 'pr.png'].map((image, idx) => (
          <Carousel.Item key={idx}>
            <div className="picsum-img-wrapper">
              <Image
                className="d-block w-100"
                src={`/assets/img/${image}`}
                alt={`Slide ${idx + 1}`}
                height={500}
                width={500}
              />
            </div>
            {idx === 0 && (
              <Carousel.Caption>
                <h1>We sell lifestyle.</h1>
                <p>Flat 40% OFF on premium brands</p>
                <Link href="/products" className="btn btn-danger btn-lg active">Shop Now</Link>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>

      {/** Product Categories **/}
      <div className="m-4">
        <div className="row text-center" id="item_list">
          {prod_cat.map((product: ProductCategories) => (
            <div className="col-sm-3" key={product.id}>
              <div className="card mb-3">
                <Image
                  src={'/' + product.image}
                  className="card-img-top"
                  alt={product.name}
                  height={150}
                  width={150}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.title}</p>
                  <Link href="/products" className="btn btn-primary">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
