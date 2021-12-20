import { useState } from 'react';
import type { NextPage } from 'next';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import AuthLayout from '../components/AuthLayout';
import AuthLink from '../components/AuthLink';
import AuthButton from '../components/AuthButton';
import AuthInputField from '../components/AuthInputField';
import AuthForm from '../components/AuthForm';

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev)
  };

  return (
    <AuthLayout pageTitle="Login | Vevericka" formTitle="Login">
      <AuthForm>
        <AuthInputField
          label="Email"
          placeholder="Email"
          type="email"
          update={(e) => {
            setEmail(e.target.value);
          }}
        />

        <AuthInputField
          label="Password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          update={(e) => {
            setPassword(e.target.value)
          }}
          appendIcon={() => {
            return showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />
          }}
          appendIconAlt="Show password"
          appendIconClick={onShowPasswordClick}
        />

        <AuthButton text="Login" onClick={() => {
          console.log({ email, password });
        }} />
        
        <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
          <AuthLink href="/register" text="New user?" cta="Register" />
          <AuthLink href="/reset" text="Forgot password?" cta="Reset" />
        </div>
      </AuthForm>
    </AuthLayout>
  );
}

export default Login;
