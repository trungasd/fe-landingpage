import classNames from 'classnames/bind';
import style from './Hero.module.scss';
import images from '~/assest/images';

const cx = classNames.bind(style);

function Hero() {
    return (
        <section id='hero' className={cx('hero')}>
            <div className={cx('hero__wrap')}>
                <div className={cx('hero__content')}>
                    <h1 className={cx('hero__heading')}>Business to achieve goals effectively and efficiently.</h1>
                    <p className={cx('hero__desc')}>Save time and get reliable results quckly.</p>
                    <div className={cx('hero__row')}>
                        <a className={cx('btn')}>View Our Work</a>
                        <span className={cx('hero__phone')}>or call 123 456 789</span>
                    </div>
                </div>

                <div className={cx('hero__media')}>
                    <figure className={cx('hero__images')}>
                        <img className={cx('hero__img')} src={images.hero1} />
                        <img className={cx('hero__img')} src={images.hero2} />
                    </figure>
                </div>
            </div>
        </section>
    );
}

export default Hero;
