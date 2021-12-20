export interface AuthFormProps {
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {
  return (
    <form className="flex flex-col mt-4 lg:mt-12 w-full">
      {children}
    </form>
  )
}

export default AuthForm;
