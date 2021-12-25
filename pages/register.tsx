import { useContext } from 'react';
import type { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import AuthInputField from '../components/AuthInputField';
import AuthLayout from '../components/AuthLayout';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import AuthButton from '../components/AuthButton';
import AuthLink from '../components/AuthLink';
import { RegisterContext } from '../context/RegisterContext';
import AuthStepper from '../components/AuthStepper';

const Register: NextPage = () => {
  const ctx = useContext(RegisterContext);

  const onShowPasswordClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    ctx.setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout pageTitle="Register | Vevericka" formTitle="Register">
      <AuthStepper>
        <AuthStepper.Step>
          <AuthForm>
            <AuthInputField
              label="Email"
              placeholder="Email"
              type="email"
              update={ctx.setEmail}
            />

            <AuthInputField
              label="Username"
              placeholder="Username"
              type="text"
              update={ctx.setUsername}
            />
          </AuthForm>
        </AuthStepper.Step>

        <AuthStepper.Step>
          <AuthForm>
            <AuthInputField
              label="Name"
              placeholder="Name"
              type="text"
              update={ctx.setName}
            />

            <AuthInputField
              label="Password"
              placeholder="Password"
              type={ctx.showPassword ? 'text' : 'password'}
              update={ctx.setPassword}
              appendIcon={() => {
                return ctx.showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeOffIcon className="w-5 h-5" />
                );
              }}
              appendIconAlt="Show password"
              appendIconClick={onShowPasswordClick}
            />

            <AuthButton
              text="Register"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </AuthForm>
        </AuthStepper.Step>
      </AuthStepper>

      <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
        <AuthLink href="/login" text="Already have an account?" cta="Login" />
        <AuthLink href="/reset" text="Forgot password?" cta="Reset" />
      </div>
    </AuthLayout>
  );
};

export default Register;
