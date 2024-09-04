import classNames from 'classnames/bind';
import style from './About.module.scss';
import images from '~/assest/images';

const cx = classNames.bind(style);

function About() {
    return( 
        <section id='about' className={cx('about')}>
            <h2 className={cx('about__heading')}>
                About Us
            </h2>
            <div className={cx('about__row')}>
                <figure>
                    <img className={cx('about__img')} src={images.about}/>
                </figure>
                <div>
                    <div className={cx('about__list')}>
                        <section className={cx('about-item')}>
                            <div className={cx('about-item__body')}>
                                <p className={cx('about-item__desc')}>
                                    IEC Group is an enterprise specializing in providing optimal foreign language teaching and learning solutions suitable for the majority of Vietnamese people. In addition to providing software, books and learning equipment for students, constantly improving the quality of teaching, we also work directly with customers to advise on financial and operational strategies.
                                </p>
                                <p className={cx('about-item__desc')}>
                                Our work covers a wide range of public, private and social sector institutions, spanning from K-12 schools, colleges, universities and language centers.
                                </p>
                            </div>
                        </section>
                    </div>
                    <a href='https://iecgroup.vn/about' className={cx('btn')} target='_blank'>More About Us</a>
                </div>
            </div>
        </section>
    )
}

export default About;
