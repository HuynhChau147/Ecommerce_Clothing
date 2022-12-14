import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';

import './User.scss';
import { FiShoppingBag } from 'react-icons/fi';

const userNav = [
  {
    title: 'Trang cá nhân',
    path: 'info',
    Icon: <IoMdSettings className="user__icon" />,
  },
  {
    title: 'Đơn hàng',
    path: 'my-order',
    Icon: <FiShoppingBag className="user__icon" />,
  },
];

const User = () => {
    const [isActiveUserNav, setIsActiveUserNav] = useState(false);

  return (
    <main className="user-layout container">
      <section className={`user-l ${isActiveUserNav ? 'active' : ''}`}>
        <ul className="user__list">
          {userNav.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'user__item user__item--active' : 'user__item'
              }
              onClick={() => setIsActiveUserNav(false)}
            >
              {item.Icon}
              <strong>{item.title}</strong>
            </NavLink>
          ))}
        </ul>
      </section>
      <section className="user-r">
        {/* <div
          className="user__setting"
          onClick={() => setIsActiveUserNav(!isActiveUserNav)}
        >
          <IoMdSettings />
          </div>*/}
        <Outlet />
      </section>
    </main>
  );
};
export default User;