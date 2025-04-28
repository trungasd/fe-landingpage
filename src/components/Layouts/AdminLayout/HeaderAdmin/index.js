import classNames from 'classnames/bind';
import style from './HeaderAdmin.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const cx = classNames.bind(style);

function HeaderAdmin() {
    const navigate = useNavigate();

    useEffect(() => {
        updateClock(); // Initialize clock
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login'); // Use navigate to redirect to login page
    };

    function updateClock() {
        const weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

        function checkTime(i) {
            return i < 10 ? '0' + i : i;
        }

        function tick() {
            const today = new Date();
            const day = weekday[today.getDay()];
            const dd = checkTime(today.getDate());
            const mm = checkTime(today.getMonth() + 1);
            const yyyy = today.getFullYear();
            const h = checkTime(today.getHours());
            const m = checkTime(today.getMinutes());
            const s = checkTime(today.getSeconds());
            const nowTime = `${h} giờ ${m} phút ${s} giây`;
            const date = `${day}, ${dd}/${mm}/${yyyy}`;
            const tmp = `<span class="date">${date} - ${nowTime}</span>`;
            const clockElement = document.getElementById('clock');
            if (clockElement) {
                clockElement.innerHTML = tmp;
            }
        }

        tick(); // Initial call
        const intervalId = setInterval(tick, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }

    return (
        <div className={cx('header')}>
            <div id="clock" className={cx('clock')}></div>
            <button className={cx('logout')} onClick={handleLogout}>
                Đăng Xuất
            </button>
        </div>
    );
}

export default HeaderAdmin;
