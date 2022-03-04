export interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className="bg-midnight text-white">{text}</button>;
};

export default Button;
