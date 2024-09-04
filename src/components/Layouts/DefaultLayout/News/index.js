import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import style from './News.module.scss';

const cx = classNames.bind(style);

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news');
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <section id="news" className={cx('news')}>
            <div className={cx('news__inner')}>
                <div className={cx('news__content')}>
                    <h2 className={cx('news__heading')}>Read Latest News & Events</h2>
                    <a href="https://iecgroup.vn/news-event" className={cx('news__more')} target="_blank">
                        Read All Blog
                    </a>
                </div>
                <h2 className={cx('news__title')}>News</h2>
                <div className={cx('news__list')}>
                    {news.map((item, index) => (
                        <div key={index} className={cx('news-item')}>
                            <figure className={cx('news-item__thumb')}>
                                <a href={item.link} target="_blank">
                                    <img src={item.image} className={cx('news-item__img')} alt={item.title} />
                                </a>
                            </figure>
                            <div className={cx('news-item__body')}>
                                <h3>
                                    <a href={item.link} target="_blank">
                                        {item.title}
                                    </a>
                                </h3>
                                <p className={cx('news-item__desc')}>{item.content}</p>
                                <a href={item.link} target="_blank">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default News;
