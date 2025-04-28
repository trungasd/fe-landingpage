import classNames from 'classnames/bind';
import Header from './Header';
import style from './DefaultLayout.module.scss';
import Footer from './Footer';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
