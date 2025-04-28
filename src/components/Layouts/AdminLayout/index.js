//src/components/Layouts/AdminLayout/index.js

import classNames from 'classnames/bind';
import style from './AdminLayout.module.scss';
import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';

const cx = classNames.bind(style);

function AdminLayout({ children }) {
    return (
        <div className={cx('common')}>
            <Sidebar />
            <div className={cx('content')}>
                <HeaderAdmin />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
