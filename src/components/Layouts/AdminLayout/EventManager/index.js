import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './EventManager.module.scss';

const cx = classNames.bind(style);

const API_URL = 'http://localhost:5000/api/event';

function EventManager() {
    const [event, setEvent] = useState([]);
    const [eventData, setEventData] = useState({
        image: '',
        title: '',
        content: '',
        link: '',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(API_URL);
            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0]; // Sửa thành 'files' thay vì 'file'
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
                    setEventData((prevData) => ({
                        ...prevData,
                        image: resizedImage,
                    }));
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        const { image, title, content, link } = eventData;
        return image && title && content && link;
    };

    const clearInputs = () => {
        setEventData({
            image: '',
            title: '',
            content: '',
            link: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddEvent = async () => {
        if (isFormValid()) {
            try {
                const response = await axios.post(`${API_URL}/add`, eventData);
                setEvent([...event, response.data]);
                clearInputs();
            } catch (error) {
                console.error('Error adding event:', error);
            }
        } else {
            alert('Vui lòng điền đầy đủ thông tin sự kiện.');
        }
    };

    const handleEditEvent = async (index) => {
        setEventData(event[index]);
        setEditingIndex(index);
    };

    const handleUpdateEvent = async () => {
        try {
            const eventToUpdate = event[editingIndex];
            await axios.put(`${API_URL}/${eventToUpdate._id}`, eventData);
            const updateEvent = event.map((item, index) =>
                index === editingIndex ? { ...eventToUpdate, ...eventData } : item,
            );
            setEvent(updateEvent);
            clearInputs();
            setEditingIndex(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async (index) => {
        try {
            const eventToDelete = event[index];
            await axios.delete(`${API_URL}/${eventToDelete._id}`);
            const updatedEvent = event.filter((_, i) => i !== index);
            setEvent(updatedEvent);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className={cx('event__manager')}>
            <div className={cx('content__title')}>Quản lý sự kiện</div>
            <div className={cx('wrap-content__enter')}>
                <div className={cx('content__enter')}>
                    <div className={cx('wrap__enter-info')}>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="image">Ảnh sự kiện</label>
                            <input type="file" name="image" onChange={handleImageChange} ref={fileInputRef} />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Tiêu đề"
                                value={eventData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="content">Nội dung</label>
                            <input
                                type="text"
                                name="content"
                                placeholder="Nội dung"
                                value={eventData.content}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={cx('item__enter-info')}>
                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                name="link"
                                placeholder="Link"
                                value={eventData.link}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        className={cx('btn__add-event')}
                        onClick={handleAddEvent}
                        style={{ display: editingIndex !== null ? 'none' : 'block' }}
                    >
                        Thêm sự kiện
                    </button>
                    <button
                        className={cx('btn__update-event')}
                        onClick={handleUpdateEvent}
                        style={{ display: editingIndex !== null ? 'block' : 'none' }}
                    >
                        Cập nhật
                    </button>

                    <div className={cx('wrap__event-list')}>
                        <table className={cx('table__event')}>
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
                                {event.map((item, index) => (
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
                                            <button onClick={() => handleEditEvent(index)}>Sửa</button>
                                            <button onClick={() => handleDeleteEvent(index)}>Xóa</button>
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

export default EventManager;
