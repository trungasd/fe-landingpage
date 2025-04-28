import classNames from 'classnames/bind';
import style from './Footer.module.scss';

const cx = classNames.bind(style);

function Footer() {
    return (
        <section className={cx('footer')}>
            <p className={cx('footer__title')}>&copy; Copyright (R) 2021. IEC Group Consulting all rights reserved.</p>
        </section>
    );
}

export default Footer;
