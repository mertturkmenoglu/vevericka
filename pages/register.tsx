import { useState } from 'react';
import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import AuthButton from '../components/AuthButton';
import AuthLink from '../components/AuthLink';

const Register: NextPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout pageTitle="Register | Vevericka" formTitle="Register">
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
          label="Username"
          placeholder="Username"
          type="text"
          update={(e) => {
            setUsername(e.target.value);
          }}
        />

        <AuthInputField
          label="Name"
          placeholder="Name"
          type="text"
          update={(e) => {
            setName(e.target.value);
          }}
        />

        <AuthInputField
          label="Password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          update={(e) => {
            setPassword(e.target.value);
          }}
          appendIcon={() => {
            return showPassword ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOffIcon className="w-5 h-5" />
            );
          }}
          appendIconAlt="Show password"
          appendIconClick={onShowPasswordClick}
        />

        <AuthButton
          text="Login"
          onClick={() => {
            console.log({ email, password, name, username });
          }}
        />

        <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
          <AuthLink href="/login" text="Already have an account?" cta="Login" />
          <AuthLink href="/reset" text="Forgot password?" cta="Reset" />
        </div>
      </AuthForm>
    </AuthLayout>
  );
};

export default Register;
