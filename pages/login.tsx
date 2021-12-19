import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';


const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPasswordClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev)
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Head>
        <title>Login | Vevericka</title>
      </Head>

      {/* Login LHS */}
      <div className="w-full lg:w-8/12 bg-deep-orange text-white h-1/2 lg:h-full flex flex-col justify-center items-center">
        <Image src="/assets/icon_white.svg" width={256} height={256} alt="Vevericka logo" />
        <h1 className="mt-8 font-thin text-6xl">Vevericka</h1>
        <h2 className="mt-4 uppercase tracking-wide font-medium text-center">We are the squirrels who say vik!</h2>
      </div>

      {/* Login RHS */}
      <div className="w-full lg:w-4/12 h-1/2 lg:h-full flex flex-col items-center justify-center">
        <div className="w-3/4 md:w-2/4 lg:w-3/4 xl:w-2/4 bg-white text-deep-orange flex flex-col items-center justify-center">
          <div className="font-normal text-3xl">Login</div>
          <form className="flex flex-col mt-4 lg:mt-12 w-full">
            <div className="relative w-full">
              <label htmlFor="loginEmail" className="font-medium text-sm absolute -top-3 left-3 bg-white px-1">Email</label>
              <input 
                type="email" 
                id="loginEmail" 
                className="border border-gray-500 text-black rounded-md h-8 px-4 w-full placeholder:text-gray-600 focus:outline-none focus:border-deep-orange"
                placeholder="Email"
              />
            </div>

            <div className="relative w-full mt-8">
              <label htmlFor="loginPassword" className="font-medium text-sm absolute -top-3 left-2 bg-white px-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="loginPassword"
                className="border border-gray-500 text-black rounded-md h-8 px-4 w-full placeholder:text-gray-600 focus:outline-none focus:border-deep-orange"
                placeholder="Password"
              />
              <button onClick={onShowPasswordClick} className="absolute top-1.5 right-3">
                <span className="sr-only">
                  Show password
                </span>
                {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
              </button>
            </div>

            <button className="bg-white border border-deep-orange rounded-md mt-10 py-2 font-medium uppercase text-sm hover:bg-deep-orange hover:text-white transition ease-in-out delay-75">
              Login
            </button>
            
            <div className="mt-4 flex flex-col text-gray-600 text-sm w-full items-center">
              <Link href="/register">
                <a>
                  New user? <span className="text-deep-orange hover:underline">Register</span>
                </a>
              </Link>
              <Link href="/password">
                <a>
                  Forgot password? <span className="text-deep-orange hover:underline">Reset</span>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
