import classNames from 'classnames/bind';
import style from './Contact.module.scss';

const cx = classNames.bind(style);

function Contact() {
    return (
        <section id="contact" className={cx('contact')}>
            <div className={cx('contact__inner')}>
                <h2 className={cx('contact__heading')}>IEC Group</h2>
                <p className={cx('contact__desc')}>
                    Address:
                    <br />
                    Office - 6/21 Do Son, Ward 4, Tan Binh District, Ho Chi Minh City <br />
                    Warehouse - 6/21 Do Son, Ward 4, Tan Binh District, Ho Chi Minh City <br />
                    Phone: 028 224 77 686 <br />
                    Email: info@iecgroup.vn
                </p>
                <a href="https://iecgroup.vn/contact" className={cx('btn')} target="_blank">
                    Contact
                </a>
            </div>
        </section>
    );
}

export default Contact;
