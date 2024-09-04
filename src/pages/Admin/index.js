//src/pages/Admin/index.js

import classNames from 'classnames/bind';
import style from '~/components/Layouts/AdminLayout/AdminLayout.module.scss';
import EventManager from '~/components/Layouts/AdminLayout/EventManager';
import HomeManager from '~/components/Layouts/AdminLayout/HomeManager';
import NewsManager from '~/components/Layouts/AdminLayout/NewsManager';
import ProductManager from '~/components/Layouts/AdminLayout/ProductManager';

const cx = classNames.bind(style);

function Admin() {
    return (
        <div>
            <HomeManager />
            <ProductManager />
            <NewsManager />
            <EventManager />
        </div>
    )
}

export default Admin;