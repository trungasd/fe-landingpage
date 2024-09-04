import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './Event.module.scss';

const cx = classNames.bind(style);

function Event() {
    const [event, setEvent] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/event');
                setEvent(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();
    });
    return (
        <section id="event" className={cx('event')}>
            <h2 className={cx('event__title')}>Events</h2>
            <div className={cx('event__list')}>
                {event.map((item, index) => (
                    <div key={index} className={cx('event-item')}>
                        <figure className={cx('event-item__thumb')}>
                            <a href={item.link} target="_blank">
                                <img src={item.image} className={cx('event-item__img')} alt={item.title}></img>
                            </a>
                        </figure>
                        <div className={cx('event-item__body')}>
                            <h3>
                                <a href={item.link} target="_blank">
                                    {item.title}
                                </a>
                            </h3>
                            <p className={cx('event-item__desc')}>{item.content}</p>
                            <a href={item.link} target="_blank">
                                Learn More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Event;
