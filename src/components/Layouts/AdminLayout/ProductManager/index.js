import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './ProductManager.module.scss';

const cx = classNames.bind(style);

const API_URL = 'http://localhost:5000/api/products';

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productData, setProductData] = useState({
        image: '',
        price: '',
        name: '',
        link: '',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setOriginalProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước hình ảnh phải nhỏ hơn 5MB.');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData((prevData) => ({
                    ...prevData,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        const { image, price, name, link } = productData;
        return image && price && name && link;
    };

    console.log(productData);

    const clearInputs = () => {
        setProductData({
            image: '',
            price: '',
            name: '',
            link: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddProduct = async () => {
        if (isFormValid()) {
            try {
                const response = await axios.post(`${API_URL}/add`, productData);
                const newProducts = [...products, response.data];
                setProducts(newProducts);
                setOriginalProducts(newProducts);
                clearInputs();
            } catch (error) {
                console.error('Error adding product:', error);
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
        }
    };

    const handleEditProduct = (index) => {
        setProductData(products[index]);
        setEditingIndex(index);
    };

    const handleUpdateProduct = async () => {
        if (isFormValid()) {
            try {
                const productToUpdate = products[editingIndex];
                await axios.put(`${API_URL}/${productToUpdate._id}`, productData);
                const updatedProducts = products.map((product, index) =>
                    index === editingIndex ? { ...productToUpdate, ...productData } : product,
                );
                setProducts(updatedProducts);
                setOriginalProducts(updatedProducts);
                clearInputs();
                setEditingIndex(null);
            } catch (error) {
                alert('Lỗi khi cập nhật sản phẩm: ' + error.message);
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
        }
    };

    const handleDeleteProduct = async (index) => {
        try {
            const productToDelete = products[index];
            await axios.delete(`${API_URL}/${productToDelete._id}`);
            const updatedProducts = products.filter((_, i) => i !== index);
            setProducts(updatedProducts);
            setOriginalProducts(updatedProducts);
        } catch (error) {
            alert('Lỗi khi xóa sản phẩm: ' + error.message);
        }
    };

    const handleSearch = () => {
        if (searchTerm === '') {
            setProducts(originalProducts);
        } else {
            const filteredProducts = originalProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
            setProducts(filteredProducts);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setProducts(originalProducts);
        }
    };

    return (
        <div className={cx('product__manager')}>
            <div className={cx('content__title')}>Quản lý sản phẩm</div>
            <div className={cx('wrap-content__enter')}>
                <div className={cx('content__enter')}>
                    <div className={cx('wrap__search')}>
                        <input
                            type="text"
                            className={cx('input__search')}
                            placeholder="Tìm kiếm theo tên..."
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                        />
                        <button className={cx('btn__search')} onClick={handleSearch}>
                            Tìm Kiếm
                        </button>
                    </div>
                    <div className={cx('wrap__enter-info')}>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="image">Ảnh sản phẩm</label>
                            <input
                                type="file"
                                name="image"
                                id="inputProductImage"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input
                                type="number"
                                name="price"
                                id="inputProductPrice"
                                placeholder="Giá"
                                value={productData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input
                                type="text"
                                name="name"
                                id="inputProductName"
                                placeholder="Tên sản phẩm"
                                value={productData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                name="link"
                                id="inputProductLink"
                                placeholder="Link"
                                value={productData.link}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        className={cx('btn__add-product')}
                        onClick={handleAddProduct}
                        style={{ display: editingIndex !== null ? 'none' : 'block' }}
                    >
                        Thêm sản phẩm
                    </button>
                    <button
                        className={cx('btn__update-product')}
                        onClick={handleUpdateProduct}
                        style={{ display: editingIndex !== null ? 'block' : 'none' }}
                    >
                        Cập nhật sản phẩm
                    </button>

                    <div className={cx('wrap__product-list')}>
                        <table className={cx('table__product')}>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Giá</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Link</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            {product.image && (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            )}
                                        </td>
                                        <td>{product.price}</td>
                                        <td>{product.name}</td>
                                        <td>{product.link}</td>
                                        <td>
                                            <button onClick={() => handleEditProduct(index)}>Sửa</button>
                                            <button onClick={() => handleDeleteProduct(index)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManager;
