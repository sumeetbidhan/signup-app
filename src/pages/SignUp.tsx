import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import FormInput from '../components/FormInput';
import { isMatching, isValidGmail, isValidName, isValidPassword, isValidPhone, isValidUsername, required } from '../utils/validation';

type SignUpState = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SignUpState>({ name: '', username: '', email: '', phone: '', password: '', confirm: '' });
  const [touched, setTouched] = useState<Record<keyof SignUpState, boolean>>({ name: false, username: false, email: false, phone: false, password: false, confirm: false });

  const errors = useMemo(() => {
    const e: Partial<Record<keyof SignUpState, string>> = {};
    if (!required(data.name)) e.name = 'Name is required';
    else if (!isValidName(data.name)) e.name = 'Only alphabets allowed';

    if (!required(data.username)) e.username = 'Username is required';
    else if (!isValidUsername(data.username)) e.username = 'Use letters, numbers and ._-@#$!%*';

    if (!required(data.email)) e.email = 'Email is required';
    else if (!isValidGmail(data.email)) e.email = 'Use a valid Gmail address';

    if (!required(data.phone)) e.phone = 'Phone is required';
    else if (!isValidPhone(data.phone)) e.phone = 'Use +<country> <number>';

    if (!required(data.password)) e.password = 'Password is required';
    else if (!isValidPassword(data.password)) e.password = 'Invalid characters used';
    else if (data.password === data.username) e.password = 'Password must differ from username';

    if (!required(data.confirm)) e.confirm = 'Confirm your password';
    else if (!isMatching(data.password, data.confirm)) e.confirm = 'Passwords do not match';
    return e;
  }, [data]);

  const onChange = (key: keyof SignUpState) => (value: string) => setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ name: true, username: true, email: true, phone: true, password: true, confirm: true });
    if (Object.keys(errors).length === 0) {
      // Simulate success -> back to login
      navigate('/login');
    }
  };

  return (
    <div className="page-shell">
      <div className="card">
        <HeaderBar title="Create new Account" />
        <div className="card__body">
          <form onSubmit={onSubmit} noValidate>
            <div className="grid grid--2">
              <FormInput label="Name" name="name" value={data.name} onChange={onChange('name')} error={touched.name ? errors.name : undefined} placeholder="Your full name" />
              <FormInput label="Username" name="username" value={data.username} onChange={onChange('username')} error={touched.username ? errors.username : undefined} placeholder="Choose a username" />
              <FormInput label="Email" type="email" name="email" value={data.email} onChange={onChange('email')} error={touched.email ? errors.email : undefined} placeholder="you@gmail.com" />
              <FormInput label="Phone No." type="tel" name="phone" value={data.phone} onChange={onChange('phone')} error={touched.phone ? errors.phone : undefined} placeholder="+91 9876543210" />
              <FormInput label="New Password" type="password" name="password" value={data.password} onChange={onChange('password')} error={touched.password ? errors.password : undefined} placeholder="Create a password" />
              <FormInput label="Confirm New Password" type="password" name="confirm" value={data.confirm} onChange={onChange('confirm')} error={touched.confirm ? errors.confirm : undefined} placeholder="Re-enter password" />
            </div>
            <div className="actions" style={{ marginTop: 32 }}>
              <button className="btn" type="submit">Sign Up</button>
            </div>
          </form>
          <p className="helper" style={{ marginTop: 16 }}>
            Already have an account? <Link className="link" to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


