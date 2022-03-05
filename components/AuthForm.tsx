export interface AuthFormProps {
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <form className="mt-4 flex w-full flex-col bg-white dark:bg-neutral-800 lg:mt-4">
      {children}
    </form>
  );
};

export default AuthForm;
