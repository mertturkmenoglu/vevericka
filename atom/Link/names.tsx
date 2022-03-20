export interface Props {
  names: string[];
}

const Test: React.FC<Props> = ({ names }) => {
  return (
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
};

export default Test;
