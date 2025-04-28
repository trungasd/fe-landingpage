import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './NewsManager.module.scss';

const cx = classNames.bind(style);

const API_URL = 'http://localhost:5000/api/news';

function NewsManager() {
    const [news, setNews] = useState([]);
    const [newsData, setNewsData] = useState({
        image: '',
        title: '',
        content: '',
        link: '',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(API_URL);
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const resizedImage = canvas.toDataURL(file.type);
                    setNewsData((prevData) => ({
                        ...prevData,
                        image: resizedImage,
                    }));
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        const { image, title, content, link } = newsData;
        return image && title && content && link;
    };

    const clearInputs = () => {
        setNewsData({
            image: '',
            title: '',
            content: '',
            link: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddNews = async () => {
        if (isFormValid()) {
            try {
                const response = await axios.post(`${API_URL}/add`, newsData);
                setNews([...news, response.data]);
                clearInputs();
            } catch (error) {
                console.error('Error adding news:', error);
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin tin tức.');
        }
    };

    const handleEditNews = (index) => {
        setNewsData(news[index]);
        setEditingIndex(index);
    };

    const handleUpdateNews = async () => {
        try {
            const newsToUpdate = news[editingIndex];
            await axios.put(`${API_URL}/${newsToUpdate._id}`, newsData);
            const updatedNews = news.map((item, index) =>
                index === editingIndex ? { ...newsToUpdate, ...newsData } : item,
            );
            setNews(updatedNews);
            clearInputs();
            setEditingIndex(null);
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    const handleDeleteNews = async (index) => {
        try {
            const newsToDelete = news[index];
            await axios.delete(`${API_URL}/${newsToDelete._id}`);
            const updatedNews = news.filter((_, i) => i !== index);
            setNews(updatedNews);
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    return (
        <div className={cx('news__manager')}>
            <div className={cx('content__title')}>Quản lý tin tức</div>
            <div className={cx('wrap-content__enter')}>
                <div className={cx('content__enter')}>
                    <div className={cx('wrap__enter-info')}>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="image">Ảnh tin tức</label>
                            <input type="file" name="image" onChange={handleImageChange} ref={fileInputRef} />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Tiêu đề"
                                value={newsData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="content">Nội dung</label>
                            <input
                                type="text"
                                name="content"
                                placeholder="Nội dung"
                                value={newsData.content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                name="link"
                                placeholder="Link"
                                value={newsData.link}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        className={cx('btn__add-news')}
                        onClick={handleAddNews}
                        style={{ display: editingIndex !== null ? 'none' : 'block' }}
                    >
                        Thêm tin tức
                    </button>
                    <button
                        className={cx('btn__update-news')}
                        onClick={handleUpdateNews}
                        style={{ display: editingIndex !== null ? 'block' : 'none' }}
                    >
                        Cập nhật
                    </button>

                    <div className={cx('wrap__news-list')}>
                        <table className={cx('table__news')}>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tiêu đề</th>
                                    <th>Nội dung</th>
                                    <th>Link</th>
                                    <th>Tính năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            )}
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.content}</td>
                                        <td>{item.link}</td>
                                        <td>
                                            <button onClick={() => handleEditNews(index)}>Sửa</button>
                                            <button onClick={() => handleDeleteNews(index)}>Xóa</button>
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

export default NewsManager;
