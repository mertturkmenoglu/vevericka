export interface AuthFormProps {
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <form className="flex flex-col mt-4 lg:mt-12 w-full bg-white dark:bg-neutral-800">
      {children}
    </form>
  );
};

export default AuthForm;
