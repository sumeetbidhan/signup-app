import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import FormInput from '../components/FormInput';
import { isValidUsername, isValidPassword, required } from '../utils/validation';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!required(username)) e.username = 'Username is required';
    else if (!isValidUsername(username)) e.username = 'Invalid username format';
    if (!required(password)) e.password = 'Password is required';
    else if (!isValidPassword(password)) e.password = 'Invalid password format';
    return e;
  }, [username, password]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ username: true, password: true });
    if (Object.keys(errors).length === 0) {
      // For demo, just route to signup then back per assignment.
      navigate('/signup');
    }
  };

  return (
    <div className="page-shell">
      <div className="card" style={{ maxWidth: 720 }}>
        <HeaderBar title="Login" subtitle="Sign in to continue" />
        <div className="card__body">
          <form onSubmit={onSubmit} noValidate>
            <div className="grid">
              <FormInput
                label="Username"
                name="login-username"
                value={username}
                onChange={setUsername}
                error={touched.username ? errors.username : undefined}
                placeholder="Enter your username"
              />
              <FormInput
                label="Password"
                type="password"
                name="login-password"
                value={password}
                onChange={setPassword}
                error={touched.password ? errors.password : undefined}
                placeholder="Enter your password"
              />
            </div>
            <div className="actions" style={{ marginTop: 28 }}>
              <button className="btn" type="submit">Login</button>
            </div>
          </form>
          <p className="helper" style={{ marginTop: 16 }}>
            Don't have an account?{' '}
            <Link className="link" to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


