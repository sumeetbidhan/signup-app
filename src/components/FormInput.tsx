import React, { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/form.scss';

export type FormInputProps = {
  label: string;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'name' | 'placeholder'>;

const FormInput: React.FC<FormInputProps> = ({ label, error, type = 'text', value, onChange, placeholder, name, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={classNames('field', { 'field--error': !!error })}>
      <label className="field__label" htmlFor={name}>{label}</label>
      <div className="field__control">
        <input
          id={name}
          className="field__input"
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          {...rest}
        />
        {isPassword && (
          <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} className="field__toggle" onClick={() => setShowPassword((v) => !v)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <div role="alert" className="field__error">{error}</div>}
    </div>
  );
};

export default FormInput;

