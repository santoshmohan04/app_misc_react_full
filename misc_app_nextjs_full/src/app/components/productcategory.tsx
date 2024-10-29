
import Image from 'next/image';
import { Prodinfo } from '../data/product.data';

export default function ProductCategory({ title, icon, products, onAddToCart }) {
    return (
        <div className="card mt-3">
            <div className="card-header">
                <h3><i className={icon}></i> {title}</h3>
            </div>
            <div className="card-body">
                <div className="row text-center">
                    {products.map((product:Prodinfo) => (
                        <div className="col-sm-3" key={product.id}>
                            <div className="card mb-3">
                                <Image
                                    src={`/assets/${product.image}`}
                                    className="card-img-top"
                                    alt={product.name}
                                    height={150}
                                    width={150}
                                />
                                <div className="card-body text-center">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text">${product.price}</p>
                                    <button
                                        type="button"
                                        className="btn btn-block btn-primary"
                                        onClick={() => onAddToCart(product)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}