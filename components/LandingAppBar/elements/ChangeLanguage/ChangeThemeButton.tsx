export interface ChangeThemeButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  altText: string;
  icon: JSX.Element;
}

const ChangeThemeButton: React.FC<ChangeThemeButtonProps> = ({
  onClick,
  altText,
  icon,
}) => {
  return (
    <button onClick={onClick}>
      <span className="sr-only">{altText}</span>
      {icon}
    </button>
  );
};

export default ChangeThemeButton;
