export interface AuthButtonProps {
  text: string;
  onClick: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }) => {
  return (
    <button className="auth-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthButton;
