import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FiLogOut } from 'react-icons/fi';
import { BsReceiptCutoff } from 'react-icons/bs';

import { isLoggedSelector, userSelector } from '../../store/user/userSelector';
import imageUser from '../../utils/imageUser';
import Button from '../UI/Button/Button';
import Popper from '../UI/Popper/Popper';
import './HeaderUser.scss';
import { logout } from '../../store/user/userSlice';

const HeaderUser = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(isLoggedSelector);
    const user = useSelector(userSelector);

    const logOutHandler = () => {
        dispatch(logout());
    };
    return (
        <>
            {!isLogged && (
                <div className="header__feature header__feature-login">
                    <Button as={Link} to="/auth" className="btn--outline-white">
                        LOGIN
                    </Button>
                </div>
            )}
            {isLogged && (
                <Tippy
                    interactive
                    placement="bottom-end"
                    hideOnClick="toggle"
                    render={attrs => {
                        return (
                            <Popper className="user-popper" {...attrs}>
                                <Link to="me" className="user-popper__item">
                                    <img src={imageUser(user.photo)} alt="" />
                                    <h4>{user.name}</h4>
                                </Link>
                                <Link to="me/my-order" className="user-popper__item">
                                    <BsReceiptCutoff className="user-popper__icon" />
                                    <span className="user-popper__content">Orders</span>
                                </Link>
                                <div className="user-popper__item" onClick={logOutHandler}>
                                    <FiLogOut className="user-popper__icon" />
                                    <span className="user-popper__content">Log Out</span>
                                </div>
                            </Popper>
                        );
                    }}
                >
                    <div className="header__feature header__feature-user">
                        <img src={imageUser(user.photo)} alt="" />
                    </div>
                </Tippy>
            )}
        </>
    );
};
export default HeaderUser;