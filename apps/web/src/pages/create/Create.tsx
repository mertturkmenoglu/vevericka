import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.css';
import { CreatePost } from '../../components';
import { MainLayout } from '../../layouts';

function Create(): JSX.Element {
  return (
    <MainLayout>
      <div className="mx-auto w-2/3">
        <Helmet>
          <title>New Post | Vevericka</title>
        </Helmet>
        <div className="text-2xl font-semibold text-midnight dark:text-white">Create a new post</div>

        <hr className="mt-2" />

        <CreatePost />
      </div>
    </MainLayout>
  );
}

export default Create;
