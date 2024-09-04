import classNames from 'classnames/bind';
import style from './HomeManager.module.scss'

const cx = classNames.bind(style);

function HomeManager() {
    return (
        <div className={cx('home__manager')}>
            <div className={cx('content__title')}>
                Trang Chủ
            </div>
        </div>
    )
}

export default HomeManager;