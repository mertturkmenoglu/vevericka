import { Helmet } from 'react-helmet';
import { MainLayout } from '../../layouts';

import 'react-toastify/dist/ReactToastify.css';
import { CreatePost } from '../../components';

function Create(): JSX.Element {
  return (
    <MainLayout>
      <div className="mx-auto w-2/3">
        <Helmet>
          <title>New Post | Vevericka</title>
        </Helmet>
        <div className="text-2xl font-semibold">Create a new post</div>

        <hr className="mt-2" />

        <CreatePost />
      </div>
    </MainLayout>
  );
}

export default Create;
