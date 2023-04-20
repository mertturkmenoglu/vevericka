export interface ActionsProps {
  children: React.ReactNode;
}

function Actions({ children }: ActionsProps): JSX.Element {
  return <div className="mt-4 flex items-center justify-between">{children}</div>;
}

export default Actions;
