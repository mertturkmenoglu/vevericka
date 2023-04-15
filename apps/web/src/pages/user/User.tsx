import { useLoaderData, useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts';
import { MeQuery } from '../../generated/graphql';
import { useFragment } from '../../generated';
import { userFragmentDocument } from '../../graphql';

function User(): JSX.Element {
  const { id } = useParams();
  const data = useLoaderData() as MeQuery;
  const me = useFragment(userFragmentDocument, data.me);

  return (
    <MainLayout>
      <pre>UserPage {id}</pre>
      <pre>{me.name}</pre>
    </MainLayout>
  );
}

export default User;
