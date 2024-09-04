import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState('/admin');

    const handleMenuClick = (path) => {
        setActiveMenu(path);
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar__user')}>
                <p className={cx('sidebar__user-name')}>Admin</p>
                <p className={cx('sidebar__user-des')}>Chào mừng bạn trở lại</p>
            </div>
            <div className={cx('sidebar__menu')}>
                <ul className={cx('sidebar__menu-list')}>
                    <li>
                        <NavLink 
                            className={cx('sidebar__menu-item', { 'action': activeMenu === '/admin' })}
                            to='/admin'
                            onClick={() => handleMenuClick('/admin')}
                        >
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={cx('sidebar__menu-item', { 'action': activeMenu === '/admin/product-manager' })}
                            to='/admin/product-manager'
                            onClick={() => handleMenuClick('/admin/product-manager')}
                        >
                            Quản lý sản phẩm
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={cx('sidebar__menu-item', { 'action': activeMenu === '/admin/news-manager' })}
                            to='/admin/news-manager'
                            onClick={() => handleMenuClick('/admin/news-manager')}
                        >
                            Quản lý tin tức
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={cx('sidebar__menu-item', { 'action': activeMenu === '/admin/event-manager' })}
                            to='/admin/event-manager'
                            onClick={() => handleMenuClick('/admin/event-manager')}
                        >
                            Quản lý sự kiện
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
