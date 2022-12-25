import { useLoginForm } from './useLoginForm';

function Login(): JSX.Element {
  const { register, handleSubmit, onSubmit } = useLoginForm();

  return (
    <div>
      <h2>LoginPage</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-black"
          type="email"
          {...register('email')}
        />

        <input
          className="border border-black"
          type="password"
          {...register('password')}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
