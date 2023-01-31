import { AppBar } from '../../components';

function Notifications(): JSX.Element {
  return (
    <main className="container mx-auto">
      <AppBar className="sm:mt-4" />
      <div className="mt-16">
        <h2 className="text-2xl font-medium">Notifications</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight" />
        <div className="mt-4">You don't have any notifications</div>
      </div>
    </main>
  );
}

export default Notifications;
