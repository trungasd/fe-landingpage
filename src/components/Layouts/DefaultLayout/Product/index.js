import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './Product.module.scss';

const cx = classNames.bind(style);

const API_URL = 'http://localhost:5000/api/products'; // Địa chỉ API backend của bạn

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    return (
        <section id="product" className={cx('product')}>
            <div className={cx('product__header')}>
                <h2 className={cx('section-heading')}>Products</h2>
                <a href="https://iecgroupstore.com/collections/all" className={cx('btn')} target="_blank">
                    Our Products
                </a>
            </div>
            <div className={cx('product__list')}>
                {products.map((product) => (
                    <div key={product._id} className={cx('product-item')}>
                        <div className={cx('product-item__img-bg')}>
                            <img src={product.image} className={cx('product-item__img-book')} alt={product.name} />
                        </div>
                        <h4>
                            <a
                                href={product.link}
                                className={cx('product-item__name')}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {product.name}
                            </a>
                        </h4>
                        <p className={cx('product-item__price')}>{product.price.toLocaleString()}₫</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Product;
