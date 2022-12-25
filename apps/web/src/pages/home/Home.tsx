import { useAppStore } from '../../stores';

function Home(): JSX.Element {
  const username = useAppStore((state) => state.username);
  return (
    <div>
      <div>Home Page</div>
      <div>{username}</div>
    </div>
  );
}

export default Home;
