import classNames from 'classnames/bind';
import style from '~/components/Layouts/DefaultLayout/DefaultLayout.module.scss';
import About from '~/components/Layouts/DefaultLayout/About';
import Contact from '~/components/Layouts/DefaultLayout/Contact';
import Hero from '~/components/Layouts/DefaultLayout/Hero';
import News from '~/components/Layouts/DefaultLayout/News';
import Product from '~/components/Layouts/DefaultLayout/Product';
import Tour from '~/components/Layouts/DefaultLayout/Tour';
import Event from '~/components/Layouts/DefaultLayout/Event/index,';

const cx = classNames.bind(style);

function Home() {
    return (
        <div>
            <Hero />
            <div className={cx('container')}>
                <About />
                <Product />
            </div>
            <Tour />
            <div className={cx('container')}>
                <News />
                <Event />
                <Contact />
            </div>
        </div>
    );
}

export default Home;
