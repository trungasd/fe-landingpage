import classNames from 'classnames/bind';
import style from './Tour.module.scss';
import images from '~/assest/images';

const cx = classNames.bind(style);

function Tour() {
    return (
        <section id='tour' className={cx('tour')}>
            <div className={cx('tour__inner')}>
                <div className={cx('tour__media')}>
                    <div className={cx('tour__images')}>
                        <img src={images.event1} className={cx('tour__img')} />
                        <img src={images.event2} className={cx('tour__img')} />
                    </div>
                </div>
                <div className={cx('tour__content')}>
                    <h2 className={cx('section-heading')}>UNIVERSITY TOUR EVENT</h2>
                    <p className={cx('section-desc')}>Preparing Students for Global Communication and the Workplace</p>
                    <a href="https://iecgroup.vn/voices-university-tour-2022"  className={cx('btn')} target="_blank">Learn More</a>
                </div> 
            </div>
        </section>
    );
}

export default Tour;
