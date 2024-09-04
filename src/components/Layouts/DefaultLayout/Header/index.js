import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '~/assest/images';

const cx = classNames.bind(style);

function Header() {
    return (
        <header className={cx('header')}>
            <a>
                <div className={cx('logo')}>
                    <img className={cx('logo-iec')} src={images.logo}/>
                </div>
            </a>
            <nav className={cx('navbar')}>
                <ul className={cx('navbar__list')}>
                    <li className={cx('navbar__item')}>
                        <a href='#hero' className={cx('navbar__link')}>Home</a>
                    </li>
                    <li className={cx('navbar__item')}>
                        <a href='#about' className={cx('navbar__link')}>About</a>
                    </li>
                    <li className={cx('navbar__item')}>
                        <a href='#product' className={cx('navbar__link')}>Products</a>
                    </li>
                    <li className={cx('navbar__item')}>
                        <a href='#tour' className={cx('navbar__link')}>Tour</a>
                    </li>
                    <li className={cx('navbar__item')}>
                        <a href='#news' className={cx('navbar__link')}>News/Events</a>
                    </li>
                    <li className={cx('navbar__item')}>
                        <a href='#contact' className={cx('navbar__link')}>Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
