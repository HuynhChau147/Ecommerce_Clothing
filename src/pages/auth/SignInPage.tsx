import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './auth.scss';
import { AiOutlineHome } from 'react-icons/ai';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/UI/Button/Button';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from '../../store/user/userSelector';
import { useLoginMutation } from '../../features/Auth/authApiSlice';
import { toast } from 'react-toastify';

interface IInputFields {
  email: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignInPage = () => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();
  const isLogged = useSelector(isLoggedSelector);

  const [inputFields, setInputFields] = useState<IInputFields>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!isLogged) return;

    if (location.state)
      navigate((location.state as LocationState)?.from.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, location]);
  
  // navigate route with login
  useEffect(() => {
    if (!data) return;

    const role = data.data.user.role;

    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'shipper':
        navigate('/shipper');
        break;

      default:
        if (location.state) {
          const { from } = location.state as LocationState;
          from.pathname.includes('admin') || from.pathname.includes('shipper')
            ? navigate('/')
            : navigate(from.pathname);
        } else {
          navigate('/');
        }
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, location]);

  //toast message login success
  useEffect(() => {
    if (isSuccess) toast.success('welcome you back!');
  }, [isSuccess]);

  //toast message login error
  useEffect(() => {
    if (!isError) return;
    error && toast.error((error as any).data.message);
  }, [isError, error]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    login(inputFields);
  };

  return (
    <main className="auth-container">
      <div className="auth__title">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <h1>????ng nh???p v???i email v?? m???t kh???u</h1>
      </div>
      <form className="auth__inputs" onSubmit={formSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={inputFields.email}
          onChange={inputChangeHandler}
        // required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={inputFields.password}
          onChange={inputChangeHandler}
        // required
        />
        <div className="auth__description">
          <span>N???u b???n ch??a c?? t??i kho???n </span>
          <Link to="./sign-up">????ng k?? ngay</Link>
        </div>

        <div className="auth__cta">
          <Button className="auth__btn btn--grey btn--horizontal btn--shadow">
            {isLoading ? '??ang x??? l??...' : ' ????NG NH???P'}
          </Button>
        </div>
      </form>
    </main>
  );
};
export default SignInPage;